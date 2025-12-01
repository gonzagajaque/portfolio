import type { Pointer, FBO, DoubleFBO, FluidConfig } from './types'
import type { Program, Material } from './functions'
import { bindProgram, bindMaterial } from './functions'
import { generateColor } from './utils'

export function createPointer(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  }
}

export function updatePointerDownData(
  pointer: Pointer,
  canvas: HTMLCanvasElement,
  id: number,
  posX: number,
  posY: number
) {
  pointer.id = id
  pointer.down = true
  pointer.moved = false
  pointer.texcoordX = posX / canvas.width
  pointer.texcoordY = 1.0 - posY / canvas.height
  pointer.prevTexcoordX = pointer.texcoordX
  pointer.prevTexcoordY = pointer.texcoordY
  pointer.deltaX = 0
  pointer.deltaY = 0
  pointer.color = generateColor()
}

export function updatePointerMoveData(
  pointer: Pointer,
  canvas: HTMLCanvasElement,
  posX: number,
  posY: number,
  color: { r: number; g: number; b: number }
) {
  pointer.prevTexcoordX = pointer.texcoordX
  pointer.prevTexcoordY = pointer.texcoordY
  pointer.texcoordX = posX / canvas.width
  pointer.texcoordY = 1.0 - posY / canvas.height
  pointer.deltaX = correctDeltaX(canvas, pointer.texcoordX - pointer.prevTexcoordX)
  pointer.deltaY = correctDeltaY(canvas, pointer.texcoordY - pointer.prevTexcoordY)
  pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
  pointer.color = color
}

export function updatePointerUpData(pointer: Pointer) {
  pointer.down = false
}

function correctDeltaX(canvas: HTMLCanvasElement, delta: number): number {
  let aspectRatio = canvas.width / canvas.height
  if (aspectRatio < 1) delta *= aspectRatio
  return delta
}

function correctDeltaY(canvas: HTMLCanvasElement, delta: number): number {
  let aspectRatio = canvas.width / canvas.height
  if (aspectRatio > 1) delta /= aspectRatio
  return delta
}

export function correctRadius(canvas: HTMLCanvasElement, radius: number): number {
  let aspectRatio = canvas.width / canvas.height
  if (aspectRatio > 1) radius *= aspectRatio
  return radius
}

export function splatPointer(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  config: FluidConfig,
  velocity: DoubleFBO,
  dye: DoubleFBO,
  splatProgram: Program,
  blit: (target: FBO | null, clear?: boolean) => void,
  pointer: Pointer
) {
  let dx = pointer.deltaX * config.SPLAT_FORCE
  let dy = pointer.deltaY * config.SPLAT_FORCE
  splat(gl, canvas, config, velocity, dye, splatProgram, blit, pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color)
}

export function clickSplat(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  config: FluidConfig,
  velocity: DoubleFBO,
  dye: DoubleFBO,
  splatProgram: Program,
  blit: (target: FBO | null, clear?: boolean) => void,
  pointer: Pointer
) {
  const color = generateColor()
  color.r *= 10.0
  color.g *= 10.0
  color.b *= 10.0
  let dx = 10 * (Math.random() - 0.5)
  let dy = 30 * (Math.random() - 0.5)
  splat(gl, canvas, config, velocity, dye, splatProgram, blit, pointer.texcoordX, pointer.texcoordY, dx, dy, color)
}

function splat(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  config: FluidConfig,
  velocity: DoubleFBO,
  dye: DoubleFBO,
  splatProgram: Program,
  blit: (target: FBO | null, clear?: boolean) => void,
  x: number,
  y: number,
  dx: number,
  dy: number,
  color: { r: number; g: number; b: number }
) {
  if (!velocity || !dye) return

  bindProgram(splatProgram)
  if (splatProgram.uniforms.uTarget) {
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
  }
  if (splatProgram.uniforms.aspectRatio) {
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
  }
  if (splatProgram.uniforms.point) {
    gl.uniform2f(splatProgram.uniforms.point, x, y)
  }
  if (splatProgram.uniforms.color) {
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0)
  }
  if (splatProgram.uniforms.radius) {
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(canvas, config.SPLAT_RADIUS / 100.0))
  }
  blit(velocity.write)
  velocity.swap()

  if (splatProgram.uniforms.uTarget) {
    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
  }
  if (splatProgram.uniforms.color) {
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
  }
  blit(dye.write)
  dye.swap()
}

function drawDisplay(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  dye: DoubleFBO | null,
  displayMaterial: Material,
  config: FluidConfig,
  blit: (target: FBO | null, clear?: boolean) => void,
  target: FBO | null
) {
  if (!dye) return

  const width = target == null ? gl.drawingBufferWidth : target.width
  const height = target == null ? gl.drawingBufferHeight : target.height

  bindMaterial(displayMaterial)
  if (config.SHADING && displayMaterial.uniforms.texelSize) {
    gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height)
  }
  if (displayMaterial.uniforms.uTexture) {
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0))
  }
  blit(target)
}

export function render(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  dye: DoubleFBO | null,
  displayMaterial: Material,
  config: FluidConfig,
  blit: (target: FBO | null, clear?: boolean) => void,
  target: FBO | null
) {
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.enable(gl.BLEND)
  drawDisplay(gl, dye, displayMaterial, config, blit, target)
}

