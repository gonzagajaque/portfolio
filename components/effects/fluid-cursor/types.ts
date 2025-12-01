export interface Pointer {
  id: number
  texcoordX: number
  texcoordY: number
  prevTexcoordX: number
  prevTexcoordY: number
  deltaX: number
  deltaY: number
  down: boolean
  moved: boolean
  color: { r: number; g: number; b: number }
}

export interface FBO {
  texture: WebGLTexture | null
  fbo: WebGLFramebuffer | null
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}

export interface DoubleFBO {
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  read: FBO
  write: FBO
  swap: () => void
}

export interface FormatInfo {
  internalFormat: number
  format: number
}

export interface WebGLExtensions {
  formatRGBA: FormatInfo | null
  formatRG: FormatInfo | null
  formatR: FormatInfo | null
  halfFloatTexType: number
  supportLinearFiltering: boolean
}

export interface WebGLContext {
  gl: WebGLRenderingContext | WebGL2RenderingContext
  ext: WebGLExtensions
}

export interface Uniforms {
  [key: string]: WebGLUniformLocation | null
}

export interface FluidConfig {
  SIM_RESOLUTION: number
  DYE_RESOLUTION: number
  CAPTURE_RESOLUTION: number
  DENSITY_DISSIPATION: number
  VELOCITY_DISSIPATION: number
  PRESSURE: number
  PRESSURE_ITERATIONS: number
  CURL: number
  SPLAT_RADIUS: number
  SPLAT_FORCE: number
  SHADING: boolean
  COLOR_UPDATE_SPEED: number
  PAUSED: boolean
  BACK_COLOR: { r: number; g: number; b: number }
  TRANSPARENT: boolean
}

