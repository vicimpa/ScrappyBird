import { GameObject } from "./GameObject.js";
import { Bird } from "./Bird.js";
import { Ground } from "./Ground.js";

export class Pipe extends GameObject {
  #dor = 100
  #speed = -1
  #free = true

  update() {
    const { imgUp, bird } = Pipe
    const { deltaTime } = this.game

    const {width: wX, height: wH} = imgUp

    let {x, y} = this.pos
    let {x: bX, y: bY} = bird.pos
    let {x: cX, y: cY} = bird.center

    cX -= 5
    cY -= 3

    x += this.#speed * deltaTime * 0.1

    if(x < 125 && this.#free) {
      this.#free = false
      Pipe.createPipe(this.game) 
    }

    if(x < -imgUp.width)
      this.delete()

    if(bX - cX < x + wX && bX + cX > x) {
      if(bY - cY < y + wH) 
        this.game.stop()

      if(bY + cY > wH + this.#dor + y)
        this.game.stop()
    }

    this.pos.x = x
  }

  render() {
    const { ctx } = this.game
    const { imgUp, imgDown, fg } = Pipe
    const { x, y } = this.pos
    const { height, width } = imgUp

    ctx.drawImage(imgUp, x, y)
    ctx.drawImage(imgDown, x, height + this.#dor + y)

    if(fg)
      fg.render()
  }

  /** @type {HTMLImageElement} */
  static imgUp
  /** @type {HTMLImageElement} */
  static imgDown
  /** @type {Ground} */
  static fg
  /** @type {Bird} */
  static bird

  static createPipe(game) {
    new this(game, game.width, -(Math.random() * 200) | 0)
  }
}