import Canvas from './canvas';
import Play from './play';


export default function Iksir(element: HTMLElement,
  width: number = 320, 
  height: number = 180) {


  let canvas = Canvas.make(element, width, height)
  let play = Play.make(canvas)

  return play


  }

export { default as Play } from './play'
export { default as Quad } from './quad'
export { default as Vec2 } from './vec2'
export { default as Pos } from './vec2'
