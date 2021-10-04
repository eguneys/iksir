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


  constructor(readonly canvas: Canvas) {
    this.projectionMatrix = Matrix.projection(320, 180)
  }


  draw = (quad: Quad, x: number, y: number, r: number = 0, sx: number = 1, sy: number = 1) => {

    this.quads.push(quad)

    this.elements.push(
      Rectangle.unit.transform(
        Matrix.unit
        .scale(10, 10)
        .scale(sx, sy)
        .translate(-sx * 5, -sy * 5)
        .rotate(r)
        .translate(sx * 5, sy * 5)
        .translate(x, y))

    )
  }

  flush = () => {
    let { gl, attributeBuffer, indexBuffer } = this 

    let aIndex = 0

    this.elements.forEach((element, i) => {
      let {
        vertexData,
        indices } = element

      let { fsUv } = this.quads[i]

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

    gl.viewport(0, 0, 320, 180)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(this.gl.COLOR_BUFFER_BIT)

    let vao = gl.createVertexArray()
 
    gl.bindVertexArray(vao)
 
 
    let gl_abuffer = gl.createBuffer()
 
    gl.bindBuffer(gl.ARRAY_BUFFER, gl_abuffer)
 
 
    let gl_ibuffer = gl.createBuffer()
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl_ibuffer)
 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW)
 
    let program = generateProgram(gl, vSource, fSource)
 
    gl.useProgram(program.program)
    gl.uniformMatrix3fv(program.uniformData['projectionMatrix'].location, false, this.projectionMatrix.array_t) 
 
 
    gl.bindBuffer(gl.ARRAY_BUFFER, gl_abuffer)
    gl.bufferData(gl.ARRAY_BUFFER, attributeBuffer, gl.STATIC_DRAW)
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl_ibuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW)


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


    gl.drawElements(gl.TRIANGLES, indexBuffer.length, gl.UNSIGNED_SHORT, 0) 


    this.elements = []
  }

}

