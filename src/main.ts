import Canvas from './canvas';
import Play from './play';


export default function Iksir(element: HTMLElement) {


  let canvas = Canvas.make(element)
  let play = Play.make(canvas)
  
  play.draw(30, 50, 30, 10)
  play.draw(0, 0, 10, 10)
  play.draw(60, 60, 60, 60)
  play.flush()

}

