import { GameObject } from "./GameObject.js";

export class Ground extends GameObject {
  /** @type {HTMLImageElement} */
  #img

  #bias = 0
  #speed = 0

  #index = 0

  get index() { return this.#index }

  get biasWidth() {
    return this.#bias
  }

  /** @param {HTMLImageElement} img */
  constructor(game, img, speed = 0, index = 0) {
    super(game, 0)
    this.#img = img
    this.#index = index
    this.#speed = speed
  }

  setSpeed(speed = 0) {
    this.#speed = speed
  }

  update() {
    let d = this.#speed * 0.1
    d *= this.game.deltaTime

    this.#bias += d

    if(this.#bias < 0)
      this.#bias += 288

    if(this.#bias > 288)
      this.#bias -= 288
  }

  render() {
    const { ctx, cvs } = this.game
    const { width, height } = cvs
    const { width: wImg, height: hImg } = this.#img
    const { biasWidth } = this

    ctx.drawImage(this.#img, 
      biasWidth, height - hImg)
  
    if(biasWidth < 0)
      ctx.drawImage(this.#img, 
        width + biasWidth, height - hImg) 

    if(biasWidth > 0)
      ctx.drawImage(this.#img, 
        biasWidth - width , height - hImg)
      
  }
}