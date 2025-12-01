export function scaleByPixelRatio(input: number): number {
  const pixelRatio = window.devicePixelRatio || 1
  return Math.floor(input * pixelRatio)
}

export function wrap(value: number, min: number, max: number): number {
  const range = max - min
  if (range == 0) return min
  return ((value - min) % range) + min
}

export function getResolution(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  resolution: number
): { width: number; height: number } {
  let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
  if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio

  const min = Math.round(resolution)
  const max = Math.round(resolution * aspectRatio)

  if (gl.drawingBufferWidth > gl.drawingBufferHeight)
    return { width: max, height: min }
  else return { width: min, height: max }
}

export function HSVtoRGB(h: number, s: number, v: number): { r: number; g: number; b: number } {
  let r: number = 0
  let g: number = 0
  let b: number = 0
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  return {
    r,
    g,
    b,
  }
}

export function generateColor(): { r: number; g: number; b: number } {
  let c = HSVtoRGB(Math.random(), 1.0, 1.0)
  c.r *= 0.25
  c.g *= 0.25
  c.b *= 0.25
  return c
}

