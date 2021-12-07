export default class Canvas {


  static make = ($: HTMLElement,
    width: number,
    height: number) => { 
      return new Canvas($, width, height) }


  $canvas: HTMLCanvasElement

  gl?: WebGL2RenderingContext

  constructor(readonly $wrap: HTMLElement,
    readonly width: number, 
    readonly height: number) {

    this.$canvas = document.createElement('canvas')

    this.$canvas.width = width
    this.$canvas.height = height

    $wrap.appendChild(this.$canvas)

    let gl = this.$canvas.getContext('webgl2', { alpha: true, antialias: false });
    if (gl !== null) {
      this.gl = gl
    }

    this.$canvas.addEventListener('webglcontextlost', (event) => {
      console.log('context lost')
      event.preventDefault()
      this.gl = undefined
    })


    this.$canvas.addEventListener('webglcontextrestored', () => {
      console.log('restored')
      if (gl !== null) {
        this.gl = gl
      }
    })

  } 


}
