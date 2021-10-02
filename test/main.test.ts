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
    
    expect(Rectangle.unit).toEqual(Rectangle.unit)
  })

  it('make works', () => {
    expect(Rectangle.make(2, 3, 4, 5).w)
      .toBe(4)
    expect(Rectangle.make(2, 3, 4, 5).h)
      .toBe(5)
    expect(Rectangle.make(2, 3, 4, 5).x)
      .toBe(2)
    expect(Rectangle.make(2, 3, 4, 5).y)
      .toBe(3)
  })

  it('transforms', () => {
      expect(Rectangle.unit
        .transform(Matrix.identity))
      .toEqual(Rectangle.unit)


      expect(Rectangle.unit
        .transform(
          Matrix.identity.scale(2, 3)
        )).toEqual(
          Rectangle.make(0, 0, 2, 3)
        )
  })

  it('translate and scales', () => {

      expect(Rectangle.unit
        .transform(
          Matrix.unit.translate(20, 10))
        ).toEqual(
          Rectangle.make(20, 10, 1, 1)
        )

    expect(Rectangle.unit
      .transform(
        Matrix.unit.scale(2, 3)
        .translate(10, 10))
    ).toEqual(
      Rectangle.make(10, 10, 2, 3)
    )


  })

})
