import Rectangle from './rectangle'
import Matrix from './matrix'


export default class Quad {

  static make = (texture: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number) => new Quad(texture,
      Rectangle.make(x, y, w, h))

  readonly fsUv: Float32Array

  readonly tw: number
  readonly th: number
  readonly frame: Rectangle

  get x0(): number { return this.frame.x }
  get y0(): number { return this.frame.y }

  get x1(): number { return this.frame.x1 }
  get y1(): number { return this.y0 }

  get x2(): number { return this.x1 }
  get y2(): number { return this.frame.y1 }

  get x3(): number { return this.x0 }
  get y3(): number { return this.y2 }

  constructor(readonly texture: HTMLImageElement,
    readonly _frame: Rectangle) {


    this.tw = texture.width
    this.th = texture.height

    this.frame = _frame.transform(
      Matrix.unit.scale(1/this.tw,
      1/this.th))

    this.fsUv = new Float32Array([
      this.x0,
      this.y0,
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      this.x3,
      this.y3,
    ])
  }
  
}
