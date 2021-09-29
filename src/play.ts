import Canvas from './canvas';




export default class Play {

  static make = (canvas: Canvas) => new Play(canvas)

  get gl() { return this.canvas.gl }


  constructor(readonly canvas: Canvas) {

  }

  update = (dt:number) => {
  }


  draw = () => {
   
    this.gl.viewport(0, 0, 320, 180)
    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }

}
