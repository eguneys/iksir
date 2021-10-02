import Canvas from './canvas';
import Play from './play';


export default function Iksir(element: HTMLElement) {


  let canvas = Canvas.make(element)
  let play = Play.make(canvas)
  
  play.draw(10, 10)
  play.flush()

}

