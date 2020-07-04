import { GameObject } from "./GameObject.js";
import { Vector2 } from "./Vector2.js";

export class Bird extends GameObject {

  /** @type {HTMLImageElement} */
  #img

  #speed = 0

  #centerX = 0
  #centerY = 0

  #maxSpeed = 2.1
  #minSpeed = -3

  get center() {
    return new Vector2(this.#centerX, this.#centerY)
  }

  /** @param {HTMLImageElement} img */
  constructor(game, img, x, y) {
    super(game, x, y)
    this.#img = img
    this.#centerX = img.width / 2
    this.#centerY = img.height / 2
  }

  jump() {
    this.#speed = this.#maxSpeed
  }

  update() {
    const { game } = this
    const { deltaTime } = game

    this.#speed -= 0.006 * deltaTime

    if (this.#speed < this.#minSpeed)
      this.#speed = this.#minSpeed

    this.pos.add(0, -2 * this.#speed * deltaTime * 0.08)

    if (this.pos.y + this.#centerY > 512 - 118) {
      this.game.stop()
    }
  }

  render() {
    const { ctx } = this.game
    let { x, y } = this.pos

    ctx.translate(x, y)
    ctx.rotate(this.#speed * -1 * 25 * Math.PI / 180);
    ctx.drawImage(this.#img, -this.#centerX, -this.#centerY)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(0, 0)
  }
}