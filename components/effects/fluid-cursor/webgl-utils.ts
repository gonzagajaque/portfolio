import type { Uniforms } from './types'

export function createProgram(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  let program = gl.createProgram()
  if (!program) throw new Error('Failed to create program')
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program))

  return program
}

export function getUniforms(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram
): Uniforms {
  let uniforms: Uniforms = {}
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < uniformCount; i++) {
    const activeUniform = gl.getActiveUniform(program, i)
    if (activeUniform) {
      let uniformName = activeUniform.name
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName)
    }
  }
  return uniforms
}

export function compileShader(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  type: number,
  source: string,
  keywords: string[] | null
): WebGLShader {
  source = addKeywords(source, keywords)

  const shader = gl.createShader(type)
  if (!shader) throw new Error('Failed to create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.trace(gl.getShaderInfoLog(shader))

  return shader
}

function addKeywords(source: string, keywords: string[] | null): string {
  if (keywords == null) return source
  let keywordsString = ''
  keywords.forEach((keyword: string) => {
    keywordsString += '#define ' + keyword + '\n'
  })

  return keywordsString + source
}

