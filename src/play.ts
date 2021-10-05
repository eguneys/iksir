import Canvas from './canvas';
import { generateProgram } from './compileShader'

import vSource from './default.vert'
import fSource from './default.frag'

import Matrix from './matrix'
import Rectangle from './rectangle'

import Quad from './quad'

export default class Play {

  static maxElements: number = 3200 
  static make = (canvas: Canvas) => new Play(canvas)

  get gl() { return this.canvas.gl }

  readonly projectionMatrix: Matrix

  elements: Array<Rectangle> = []
  quads: Array<Quad> = []

  attributeBuffer = new Float32Array(Play.maxElements * 4 * 2)
  indexBuffer = new Uint16Array(Play.maxElements * 6)

  glAttributeBuffer: WebGLBuffer | null = null
  glIndexBuffer: WebGLBuffer | null = null

  constructor(readonly canvas: Canvas) {
    this.projectionMatrix = Matrix.projection(320, 180)
  }

  draw = (quad: Quad, x: number, y: number, r: number = 0, sx: number = 1, sy: number = 1) => {

    this.quads.push(quad)

    this.elements.push(
      Rectangle.unit.transform(
        Matrix.unit
        .translate(-0.5, -0.5)
        .scale(quad.w * sx, quad.h * sy)
        .translate(0.5, 0.5)
        .translate(-sx * quad.w * 0.5, -sy * quad.h * 0.5)
        .rotate(r)
        .translate(sx * quad.w * 0.5, sy * quad.h * 0.5)
        .translate(x, y))

    )
  }

  glOnce = (texture: HTMLImageElement) => {

    let { gl, attributeBuffer, indexBuffer } = this 

    if (!gl) { return }

    gl.viewport(0, 0, 320, 180)
    gl.clearColor(0, 0, 0, 1)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    let vao = gl.createVertexArray()
 
    gl.bindVertexArray(vao)
 
 
    this.glAttributeBuffer = gl.createBuffer()
 
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glAttributeBuffer)
 
 
    this.glIndexBuffer = gl.createBuffer()
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glIndexBuffer)
 
    let program = generateProgram(gl, vSource, fSource)
 
    gl.useProgram(program.program)


    gl.uniformMatrix3fv(program.uniformData['projectionMatrix'].location, false, this.projectionMatrix.array_t) 
   
    gl.uniform1i(program.uniformData['uSampler'].location, 0)
 
    let stride = 2 * 4 + 2 * 4

    let a1loc = program.attributeData['aVertexPosition'].location
    gl.enableVertexAttribArray(a1loc)
    gl.vertexAttribPointer(a1loc, 2, gl.FLOAT, false, stride, 0) 
 
    let a2loc = program.attributeData['aTextureCoord'].location
    gl.enableVertexAttribArray(a2loc)
    gl.vertexAttribPointer(a2loc, 2, gl.FLOAT, false, stride, 2*4) 

    let glTexture = gl.createTexture() 


    gl.bindTexture(gl.TEXTURE_2D, glTexture)

    gl.texImage2D(gl.TEXTURE_2D, 0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255]))

   gl.bindTexture(gl.TEXTURE_2D, glTexture)
   gl.texImage2D(gl.TEXTURE_2D, 0,
     gl.RGBA, texture.width, texture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE,
     texture)

    //gl.generateMipmap(gl.TEXTURE_2D)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  }

  flush = () => {
    let { gl, attributeBuffer, indexBuffer } = this

    if (!gl) {
      return
    }

    let aIndex = 0

    this.elements.forEach((element, i) => {
      let {
        vertexData,
        indices } = element

      let { texture, fsUv } = this.quads[i]

      for (let k = 0; k < vertexData.length; k+=2) {
        attributeBuffer[aIndex++] = vertexData[k]
        attributeBuffer[aIndex++] = vertexData[k+1]
        attributeBuffer[aIndex++] = fsUv[k]
        attributeBuffer[aIndex++] = fsUv[k+1]
      }

      for (let k = 0; k < indices.length; k++) {
        indexBuffer[i * indices.length + k] = i * 4 + indices[k]
      }
    })

    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.glAttributeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, attributeBuffer, gl.STATIC_DRAW)
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glIndexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW)


    gl.drawElements(gl.TRIANGLES, indexBuffer.length, gl.UNSIGNED_SHORT, 0) 

    this.elements = []
  }

}

