import Matrix from '../src/matrix'
import Rectangle from '../src/rectangle'
import Vec2 from '../src/vec2'

import { rectEqual } from './util'

describe('Rectangle', () => {

  it('unit has 1 1 0 0', () => {
    expect(Rectangle.unit.w).toBe(1)
    expect(Rectangle.unit.h).toBe(1)
    expect(Rectangle.unit.x).toBe(0)
    expect(Rectangle.unit.y).toBe(0)
    
    rectEqual(Rectangle.unit, Rectangle.unit)
  })

  it('transforms', () => {
    rectEqual(
      Rectangle.unit.transform(Matrix.identity),
      Rectangle.unit)


    rectEqual(
      Rectangle.unit.transform(
        Matrix.identity.scale(2, 3)
      ),
      Rectangle.make(0, 0, 2, 3)
    )
  })


})
