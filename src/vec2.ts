export default class Vec2 {

  static make = (x: number, y: number) =>
    new Vec2(x, y)

  static unit = new Vec2(1, 1)
  static zero = new Vec2(0, 0)

  get vs(): Array<number> {
    return [this.x, this.y]
  }

  constructor(readonly x: number, 
    readonly y: number) {

  }

  addy(n: number) {
    return Vec2.make(this.x, this.y + n)
  }
}
