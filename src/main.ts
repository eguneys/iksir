import Canvas from './canvas';
import Play from './play';


export default function Iksir(element: HTMLElement) {


  let canvas = Canvas.make(element)
  let play = Play.make(canvas)

  return play


  }

export { default as Play } from './play'
export { default as Quad } from './quad'
export { default as Vec2 } from './vec2'
export { default as Pos } from './vec2'
