export default class Vec2 {

  static make = (x: number, y: number) =>
    new Vec2(x, y)


  constructor(readonly x: number, 
    readonly y: number) {

  }
}
