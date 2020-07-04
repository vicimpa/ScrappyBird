export class Vector2 {
  #x = 0
  #y = 0

  constructor(x, y) {
    [x, y] = Vector2.norm(x, y)

    this.#x = x
    this.#y = y
  }

  get x() { return this.#x }
  set x(v) { this.#x = v }

  get y() { return this.#y } 
  set y(v) { this.#y = v }

  add(x, y) {
    [x, y] = Vector2.norm(x, y)

    this.#x += x
    this.#y += y
  }

  del(x, y) {
    [x, y] = Vector2.norm(x, y)
    
    this.#x -= x
    this.#y -= y
  }

  mul(x, y) {
    [x, y] = Vector2.norm(x, y)
    
    this.#x *= x
    this.#y *= y
  }


  div(x, y) {
    [x, y] = Vector2.norm(x, y)
    
    this.#x /= x
    this.#y /= y
  }

  static norm(x = 0, y = x) {
    if(Array.isArray(x)) 
      [x, y] = x
    else if(typeof x == 'object' || x instanceof Vector2) {
      y = x.y; x = x.x
    }

    return [x, y]
  }
}