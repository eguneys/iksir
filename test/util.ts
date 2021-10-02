import Rectangle from '../src/rectangle'
import Vec2 from '../src/vec2'

export function vEqual(v1: Vec2, v2: Vec2) {
  expect(v1.x === v2.x 
    && v1.y === v2.y).toBe(true)
}

export function rectEqual(r1: Rectangle, r2: Rectangle) {
r1.vertices.forEach((v, i) =>
  vEqual(v, r2.vertices[i]))
}


