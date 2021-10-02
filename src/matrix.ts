import Vec2 from './vec2'


export default class Matrix {

static identity = new Matrix(1, 0, 0, 1, 0, 0)


static projection = (width: number, height: number) => {
  let b = 0,
    c = 0

  let a = 1 / width * 2,
  d = -1 / height * 2,
  tx = -1,
  ty = 1 
  
  return new Matrix(a, b, c, d, tx, ty)
}

readonly array_t: Float32Array

// a c tx
// b d ty
// 0 0 1
constructor(
  readonly a: number,
  readonly b: number,
  readonly c: number,
  readonly d: number,
  readonly tx: number,
  readonly ty: number) {
  this.array_t = new Float32Array([
    a, b, 0,
    c, d, 0,
    tx, ty, 1
  ])
}

scale(x: number, y: number): Matrix {

  let a = this.a * x,
    b = this.b,
    c = this.c,
    d = this.d,
    tx = this.tx,
    ty = this.ty

  return new Matrix(a, b, c, d, tx, ty)
}

translate(x: number, y: number): Matrix {

  let a = this.a,
    b = this.b,
    c = this.c,
    d = this.d,
    tx = x + this.tx,
    ty = y + this.ty

  return new Matrix(a, b, c, d, tx, ty)
}


mVec2(v: Vec2): Vec2 {

  let a = this.a,
    b = this.b,
    c = this.c,
    d = this.d,
    tx = this.tx,
    ty = this.ty



  let x = a * v.x + c * v.y + tx,
    y = b * v.x + d * v.y + ty

    return Vec2.make(x, y)
  }
}
