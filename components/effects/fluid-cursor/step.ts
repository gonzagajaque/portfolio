import type { DoubleFBO, FBO, FluidConfig, WebGLExtensions } from './types'
import type { Program } from './functions'
import { bindProgram } from './functions'

export function step(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  ext: WebGLExtensions,
  config: FluidConfig,
  velocity: DoubleFBO,
  curl: FBO,
  divergence: FBO,
  pressure: DoubleFBO,
  dye: DoubleFBO,
  curlProgram: Program,
  vorticityProgram: Program,
  divergenceProgram: Program,
  clearProgram: Program,
  pressureProgram: Program,
  gradienSubtractProgram: Program,
  advectionProgram: Program,
  blit: (target: FBO | null, clear?: boolean) => void,
  dt: number
) {
  if (!velocity || !curl || !divergence || !pressure || !dye) return

  gl.disable(gl.BLEND)

  bindProgram(curlProgram)
  if (curlProgram.uniforms.texelSize) {
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (curlProgram.uniforms.uVelocity) {
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
  }
  blit(curl)

  bindProgram(vorticityProgram)
  if (vorticityProgram.uniforms.texelSize) {
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (vorticityProgram.uniforms.uVelocity) {
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
  }
  if (vorticityProgram.uniforms.uCurl) {
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
  }
  if (vorticityProgram.uniforms.curl) {
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
  }
  if (vorticityProgram.uniforms.dt) {
    gl.uniform1f(vorticityProgram.uniforms.dt, dt)
  }
  blit(velocity.write)
  velocity.swap()

  bindProgram(divergenceProgram)
  if (divergenceProgram.uniforms.texelSize) {
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (divergenceProgram.uniforms.uVelocity) {
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
  }
  blit(divergence)

  bindProgram(clearProgram)
  if (clearProgram.uniforms.uTexture) {
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
  }
  if (clearProgram.uniforms.value) {
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE)
  }
  blit(pressure.write)
  pressure.swap()

  bindProgram(pressureProgram)
  if (pressureProgram.uniforms.texelSize) {
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (pressureProgram.uniforms.uDivergence) {
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
  }
  for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
    if (pressureProgram.uniforms.uPressure) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
    }
    blit(pressure.write)
    pressure.swap()
  }

  bindProgram(gradienSubtractProgram)
  if (gradienSubtractProgram.uniforms.texelSize) {
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (gradienSubtractProgram.uniforms.uPressure) {
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
  }
  if (gradienSubtractProgram.uniforms.uVelocity) {
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
  }
  blit(velocity.write)
  velocity.swap()

  bindProgram(advectionProgram)
  if (advectionProgram.uniforms.texelSize) {
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
    gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
  }
  let velocityId = velocity.read.attach(0)
  if (advectionProgram.uniforms.uVelocity) {
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
  }
  if (advectionProgram.uniforms.uSource) {
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId)
  }
  if (advectionProgram.uniforms.dt) {
    gl.uniform1f(advectionProgram.uniforms.dt, dt)
  }
  if (advectionProgram.uniforms.dissipation) {
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
  }
  blit(velocity.write)
  velocity.swap()

  if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
    gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
  }
  if (advectionProgram.uniforms.uVelocity) {
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
  }
  if (advectionProgram.uniforms.uSource) {
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
  }
  if (advectionProgram.uniforms.dissipation) {
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
  }
  blit(dye.write)
  dye.swap()
}

