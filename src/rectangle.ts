import Vec2 from './vec2'


export default class Rectangle {


  static unit = new Rectangle([
    Vec2.make(0, 0),
    Vec2.make(0, 1),
    Vec2.make(1, 1),
    Vec2.make(1, 0)
  ])

  static make = (x: number, y: number,
    w: number, h: number) => new Rectangle([
      Vec2.make(x, y),
      Vec2.make(x, y + h),
      Vec2.make(x + w, y + h),
      Vec2.make(x + w, 0)
    ])

  readonly vertices: Array<Vec2>

  get x1() { return this.vertices[0].x }
  get y1() { return this.vertices[0].y }
  get x2() { return this.vertices[2].x }
  get y2() { return this.vertices[1].y }

  get x() { return this.x1 }
  get y() { return this.y1 }
  get w() { return this.x2 - this.x1 }
  get h() { return this.y2 - this.y1 }

  constructor(readonly vertices: Array<Vec2>) {
  }


  transform(m: Matrix): Rectangle {
    return new Rectangle(this.vertices.map(_ => m.mVec2(_)))
  }


}