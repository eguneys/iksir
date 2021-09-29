export default class Canvas {


  static make = ($: HTMLElement) => { return new Canvas($) }


  $canvas: HTMLCanvasElement

  gl!: WebGL2RenderingContext

  constructor(readonly $wrap: HTMLElement) {

    this.$canvas = document.createElement('canvas')

    this.$canvas.width = 320
    this.$canvas.height = 180

    $wrap.appendChild(this.$canvas)

    let gl = this.$canvas.getContext('webgl2');
    if (gl !== null) {
      this.gl = gl
    }
  } 


}
