import Canvas from './canvas';
import Play from './play';


export default function Iksir(element: HTMLElement) {


  let canvas = Canvas.make(element)
  let play = Play.make(canvas)
  
  function step(t: number) {
    play.update(1/60)
    play.draw()
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

