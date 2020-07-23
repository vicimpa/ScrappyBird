import { Game } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
  /** @type { Game } */
  #game

  get game() { return this.#game }

  /** @type {Vector2} */
  pos

  /** @param {Game} game */
  constructor(game, x, y) {
    if (!game || !(game instanceof Game))
      throw new Error('В объект не был передан объект игры!')

    this.#game = game
    game.addObject(this)
    this.pos = new Vector2(x, y)
  }

  update() {

  }

  render() {

  }

  delete() {
    this.#game.deleteObject(this)
    this.#game = null
  }
}