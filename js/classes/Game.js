import { GameObject } from "./GameObject.js";
import { Pipe } from "./Pipe.js";

export class Game {
  /** @type {HTMLCanvasElement} */ 
  #cvs

  /** @type {CanvasRenderingContext2D} */ 
  #ctx 

  #run = false

  #time = Date.now()

  #score = 0

  get run() { return this.#run }

  get width() { return this.#cvs.width }
  get height() { return this.#cvs.height }

  get ctx() { return this.#ctx }
  get cvs() { return this.#cvs }

  get score() { return this.#score }

  get deltaTime() { return Date.now() - this.#time }

  /** @type {GameObject[]} */
  #objects = []

  constructor(query = '') {
    this.#cvs = document.querySelector(query)

    if(!this.#cvs) throw new Error(`Не найден элемент '${query}'`)

    this.#ctx = this.#cvs.getContext('2d')
  }

  /** @param {GameObject} obj */
  addObject(obj) {
    this.#objects.push(obj)
  }

  /** @param {GameObject} obj */
  deleteObject(obj) {
    let index = this.#objects.indexOf(obj)

    if(index !== -1)
      this.#objects.splice(index, 1)
  }

  update() {
    for(let obj of this.#objects)
      obj.update()

    this.refresh()
    this.render()
  }

  render() {
    for(let obj of this.#objects)
      obj.render()

    if(this.#run)
      requestAnimationFrame(() => this.update())

    this.#ctx.fillStyle = "#ffffff"
    this.#ctx.textBaseline = 24
    this.#ctx.font = '24px Arial'
    this.#ctx.fillText(`Score: ${this.score}`, 10, 24)
  }

  start() {
    if(this.#run) return
    this.#time = Date.now()
    this.#run = true
    Pipe.bird.jump()
    this.#score = 0
    this.update()
  }

  addScore() {
    this.#score++
    console.log(this.#score)
    Pipe.sound.score.play()
  }

  stop() {
    this.#run = false
  }

  refresh() {
    this.#time = Date.now()
  }

  clear() {
    this.#objects = []
  }
}

