import type { FormatInfo, WebGLContext } from './types'

export function getWebGLContext(canvas: HTMLCanvasElement): WebGLContext {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  }

  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null
  const isWebGL2 = !!gl
  if (!isWebGL2) {
    gl = (canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params)) as WebGLRenderingContext | null
  }

  if (!gl) {
    throw new Error('WebGL not supported')
  }

  let halfFloat: OES_texture_half_float | null = null
  let supportLinearFiltering: OES_texture_float_linear | OES_texture_half_float_linear | null = null
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float')
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear')
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float')
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear')
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  const glAny = gl as any
  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : (halfFloat?.HALF_FLOAT_OES ?? 0)
  let formatRGBA: FormatInfo | null
  let formatRG: FormatInfo | null
  let formatR: FormatInfo | null

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext
    formatRGBA = getSupportedFormat(
      gl,
      gl2.RGBA16F,
      gl2.RGBA,
      halfFloatTexType
    )
    formatRG = getSupportedFormat(gl, gl2.RG16F, gl2.RG, halfFloatTexType)
    formatR = getSupportedFormat(gl, gl2.R16F, gl2.RED, halfFloatTexType)
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering: !!supportLinearFiltering,
    },
  }
}

function getSupportedFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number): FormatInfo | null {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    const glAny = gl as any
    switch (internalFormat) {
      case glAny.R16F:
        return getSupportedFormat(gl, glAny.RG16F, glAny.RG, type)
      case glAny.RG16F:
        return getSupportedFormat(gl, glAny.RGBA16F, glAny.RGBA, type)
      default:
        return null
    }
  }

  return {
    internalFormat,
    format,
  }
}

function supportRenderTextureFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number): boolean {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    internalFormat,
    4,
    4,
    0,
    format,
    type,
    null
  )

  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  )

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  return status == gl.FRAMEBUFFER_COMPLETE
}

