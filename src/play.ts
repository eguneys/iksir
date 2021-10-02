import Canvas from './canvas';
import { generateProgram } from './compileShader'

import vSource from './default.vert'
import fSource from './default.frag'

import Matrix from './matrix'
import Rectangle from './rectangle'

export default class Play {

  static make = (canvas: Canvas) => new Play(canvas)

  get gl() { return this.canvas.gl }

  readonly projectionMatrix: Matrix


  elements: Array<Rectangle> = []

  constructor(readonly canvas: Canvas) {
    this.projectionMatrix = Matrix.projection(320, 180)
  }


  draw = (x: number, y: number) => {
    this.elements.push(Rectangle.unit.translate(x, y))
  }

  flush = () => {
    let { gl } = this 


    let attributeBuffer = new Float32Array(4 * 4)
    let indexBuffer = new Uint16Array(4)

    this.elements.forEach((element, i) => {

      
      
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

    indexBuffer = new Uint16Array([0, 1, 2])
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl_ibuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(0)

    gl.vertexAttribPointer(0, 2, gl.UNSIGNED_SHORT, false, 0, 0) 


    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0) 


    this.elements = []
  }

}

