import {GameObject} from "./GameObject.js";

export class Game {
  /** @type {HTMLCanvasElement} */ 
  #cvs

  /** @type {CanvasRenderingContext2D} */ 
  #ctx 

  #run = false

  #time = Date.now()

  get run() { return this.#run }

  get width() { return this.#cvs.width }
  get height() { return this.#cvs.height }

  get ctx() { return this.#ctx }
  get cvs() { return this.#cvs }

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
  }

  start() {
    this.#time = Date.now()
    this.#run = true
    this.update()
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

