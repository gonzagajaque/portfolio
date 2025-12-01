'use client'

import React, { useEffect, useRef } from 'react'
import type { Pointer, FBO, DoubleFBO, FluidConfig } from './fluid-cursor/types'
import { getWebGLContext } from './fluid-cursor/webgl-context'
import { compileShader } from './fluid-cursor/webgl-utils'
import { createMaterial, setMaterialKeywords, createProgram } from './fluid-cursor/functions'
import { createBlitFunction, createFBO, createDoubleFBO, resizeDoubleFBO } from './fluid-cursor/fbo'
import { scaleByPixelRatio, getResolution, wrap, generateColor } from './fluid-cursor/utils'
import { createPointer, updatePointerDownData, updatePointerMoveData, updatePointerUpData, splatPointer, clickSplat, render } from './fluid-cursor/simulation'
import { step } from './fluid-cursor/step'
import {
  BASE_VERTEX_SHADER,
  COPY_FRAGMENT_SHADER,
  CLEAR_FRAGMENT_SHADER,
  SPLAT_FRAGMENT_SHADER,
  ADVECTION_FRAGMENT_SHADER,
  DIVERGENCE_FRAGMENT_SHADER,
  CURL_FRAGMENT_SHADER,
  VORTICITY_FRAGMENT_SHADER,
  PRESSURE_FRAGMENT_SHADER,
  GRADIENT_SUBTRACT_FRAGMENT_SHADER,
  DISPLAY_SHADER_SOURCE,
} from './fluid-cursor/shaders'

const initFluidCursor = (canvas: HTMLCanvasElement): (() => void) | undefined => {
  if (!canvas) return

  const resizeCanvas = () => {
    let width = scaleByPixelRatio(canvas.clientWidth)
    let height = scaleByPixelRatio(canvas.clientHeight)
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width
      canvas.height = height
      return true
    }
    return false
  }

  resizeCanvas()

  const config: FluidConfig = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    CAPTURE_RESOLUTION: 1512,
    DENSITY_DISSIPATION: 0.5,
    VELOCITY_DISSIPATION: 3,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: true,
  }

  const pointers: Pointer[] = [createPointer()]
  const { gl, ext } = getWebGLContext(canvas)

  if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 256
    config.SHADING = false
  }

  const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, BASE_VERTEX_SHADER, null)
  const copyShader = compileShader(gl, gl.FRAGMENT_SHADER, COPY_FRAGMENT_SHADER, null)
  const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, CLEAR_FRAGMENT_SHADER, null)
  const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, SPLAT_FRAGMENT_SHADER, null)
  const advectionShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    ADVECTION_FRAGMENT_SHADER,
    ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
  )
  const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, DIVERGENCE_FRAGMENT_SHADER, null)
  const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, CURL_FRAGMENT_SHADER, null)
  const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, VORTICITY_FRAGMENT_SHADER, null)
  const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, PRESSURE_FRAGMENT_SHADER, null)
  const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, GRADIENT_SUBTRACT_FRAGMENT_SHADER, null)

  const copyProgram = createProgram(gl, baseVertexShader, copyShader)
  const clearProgram = createProgram(gl, baseVertexShader, clearShader)
  const splatProgram = createProgram(gl, baseVertexShader, splatShader)
  const advectionProgram = createProgram(gl, baseVertexShader, advectionShader)
  const divergenceProgram = createProgram(gl, baseVertexShader, divergenceShader)
  const curlProgram = createProgram(gl, baseVertexShader, curlShader)
  const vorticityProgram = createProgram(gl, baseVertexShader, vorticityShader)
  const pressureProgram = createProgram(gl, baseVertexShader, pressureShader)
  const gradienSubtractProgram = createProgram(gl, baseVertexShader, gradientSubtractShader)

  const displayMaterial = createMaterial(gl, baseVertexShader, DISPLAY_SHADER_SOURCE)

  const blit = createBlitFunction(gl)

  let dye: DoubleFBO | null = null
  let velocity: DoubleFBO | null = null
  let divergence: FBO | null = null
  let curl: FBO | null = null
  let pressure: DoubleFBO | null = null

  function updateKeywords() {
    let displayKeywords: string[] = []
    if (config.SHADING) displayKeywords.push('SHADING')
    setMaterialKeywords(displayMaterial, displayKeywords)
  }

  function initFramebuffers() {
    let simRes = getResolution(gl, config.SIM_RESOLUTION)
    let dyeRes = getResolution(gl, config.DYE_RESOLUTION)

    const texType = ext.halfFloatTexType
    const rgba = ext.formatRGBA
    const rg = ext.formatRG
    const r = ext.formatR

    if (!rgba || !rg || !r) {
      console.error('WebGL formats not supported')
      return
    }
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

    gl.disable(gl.BLEND)

    if (dye == null)
      dye = createDoubleFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
    else dye = resizeDoubleFBO(gl, copyProgram, dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)

    if (velocity == null)
      velocity = createDoubleFBO(gl, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
    else velocity = resizeDoubleFBO(gl, copyProgram, velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)

    divergence = createFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
    curl = createFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
    pressure = createDoubleFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
  }

  updateKeywords()
  initFramebuffers()

  let lastUpdateTime = Date.now()
  let colorUpdateTimer = 0.0

  function update() {
    const dt = calcDeltaTime()
    if (resizeCanvas()) initFramebuffers()
    updateColors(dt)
    applyInputs()
    if (velocity && curl && divergence && pressure && dye) {
      step(gl, ext, config, velocity, curl, divergence, pressure, dye, curlProgram, vorticityProgram, divergenceProgram, clearProgram, pressureProgram, gradienSubtractProgram, advectionProgram, blit, dt)
    }
    render(gl, dye, displayMaterial, config, blit, null)
    requestAnimationFrame(update)
  }

  function calcDeltaTime(): number {
    let now = Date.now()
    let dt = (now - lastUpdateTime) / 1000
    dt = Math.min(dt, 0.016666)
    lastUpdateTime = now
    return dt
  }

  function updateColors(dt: number) {
    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED
    if (colorUpdateTimer >= 1) {
      colorUpdateTimer = wrap(colorUpdateTimer, 0, 1)
      pointers.forEach((p: Pointer) => {
        p.color = generateColor()
      })
    }
  }

  function applyInputs() {
    pointers.forEach((p: Pointer) => {
      if (p.moved) {
        p.moved = false
        if (velocity && dye) {
          splatPointer(gl, canvas, config, velocity, dye, splatProgram, blit, p)
        }
      }
    })
  }

  const handleMouseDown = (e: MouseEvent) => {
    let pointer = pointers[0]
    let posX = scaleByPixelRatio(e.clientX)
    let posY = scaleByPixelRatio(e.clientY)
    updatePointerDownData(pointer, canvas, -1, posX, posY)
    if (velocity && dye) {
      clickSplat(gl, canvas, config, velocity, dye, splatProgram, blit, pointer)
    }
  }

  const handleFirstMouseMove = (e: MouseEvent) => {
    let pointer = pointers[0]
    let posX = scaleByPixelRatio(e.clientX)
    let posY = scaleByPixelRatio(e.clientY)
    let color = generateColor()
    updatePointerMoveData(pointer, canvas, posX, posY, color)
    document.body.removeEventListener('mousemove', handleFirstMouseMove)
  }

  const handleMouseMove = (e: MouseEvent) => {
    let pointer = pointers[0]
    let posX = scaleByPixelRatio(e.clientX)
    let posY = scaleByPixelRatio(e.clientY)
    let color = pointer.color
    updatePointerMoveData(pointer, canvas, posX, posY, color)
  }

  const handleTouchStart = (e: TouchEvent) => {
    const touches = e.targetTouches
    let pointer = pointers[0]
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX)
      let posY = scaleByPixelRatio(touches[i].clientY)
      updatePointerDownData(pointer, canvas, touches[i].identifier, posX, posY)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    const touches = e.targetTouches
    let pointer = pointers[0]
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX)
      let posY = scaleByPixelRatio(touches[i].clientY)
      updatePointerMoveData(pointer, canvas, posX, posY, pointer.color)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const touches = e.changedTouches
    let pointer = pointers[0]
    for (let i = 0; i < touches.length; i++) {
      updatePointerUpData(pointer)
    }
  }

  window.addEventListener('mousedown', handleMouseDown)
  document.body.addEventListener('mousemove', handleFirstMouseMove)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchmove', handleTouchMove)
  window.addEventListener('touchend', handleTouchEnd)

  requestAnimationFrame(update)

  return () => {
    window.removeEventListener('mousedown', handleMouseDown)
    document.body.removeEventListener('mousemove', handleFirstMouseMove)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
  }
}

export const FluidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cleanup = initFluidCursor(canvas)
    return cleanup
  }, [])

  return (
    <canvas
      id="fluid"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
      style={{
        mixBlendMode: 'normal',
        opacity: 0.03,
      }}
      aria-hidden="true"
    />
  )
}
