import type { Uniforms } from './types'
import { compileShader, createProgram as createWebGLProgram, getUniforms } from './webgl-utils'

function hashCode(s: string): number {
  if (s.length == 0) return 0
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export interface Material {
  vertexShader: WebGLShader
  fragmentShaderSource: string
  programs: { [hash: number]: WebGLProgram | null }
  activeProgram: WebGLProgram | null
  uniforms: Uniforms
  gl: WebGLRenderingContext | WebGL2RenderingContext
}

export function createMaterial(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShaderSource: string
): Material {
  return {
    gl,
    vertexShader,
    fragmentShaderSource,
    programs: {},
    activeProgram: null,
    uniforms: {},
  }
}

export function setMaterialKeywords(material: Material, keywords: string[] | null) {
  let hash = 0
  if (keywords) {
    for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i])
  }

  let program = material.programs[hash]
  if (program == null) {
    let fragmentShader = compileShader(
      material.gl,
      material.gl.FRAGMENT_SHADER,
      material.fragmentShaderSource,
      keywords
    )
    program = createWebGLProgram(material.gl, material.vertexShader, fragmentShader)
    material.programs[hash] = program
  }

  if (program == material.activeProgram) return

  material.uniforms = getUniforms(material.gl, program)
  material.activeProgram = program
}

export function bindMaterial(material: Material) {
  if (material.activeProgram) {
    material.gl.useProgram(material.activeProgram)
  }
}

export interface Program {
  uniforms: Uniforms
  program: WebGLProgram
  gl: WebGLRenderingContext | WebGL2RenderingContext
}

export function createProgram(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): Program {
  const webglProgram = createWebGLProgram(gl, vertexShader, fragmentShader)
  return {
    gl,
    uniforms: getUniforms(gl, webglProgram),
    program: webglProgram,
  }
}

export function bindProgram(program: Program) {
  program.gl.useProgram(program.program)
}

