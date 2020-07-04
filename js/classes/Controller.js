export class Controller {
  /** @type {number[]} */
  static keys = []

  /** @type {Array<(keyCode) => void>} */
  static listeners = []

  static emit(keyCode = 0) {
    for(let lis of this.listeners)
      lis(keyCode)
  }
  
  /** @param {(keyCode) => void} callback */
  static subscribe(callback = null) {
    let index = this.listeners.indexOf(callback)
    if(index == -1) this.listeners.push(callback)
  }

  /** @param {(keyCode) => void} callback */
  static unSubscribe(callback = null) {
    let index = this.listeners.indexOf(callback)
    if(index !== -1) this.listeners.splice(index, 1)
  }
}

window.addEventListener('keydown', ({keyCode}) => {
  const {keys} = Controller

  if(keys.indexOf(keyCode) !== -1)
    return null

  keys.push(keyCode)
  Controller.emit(keyCode)
})

window.addEventListener('mousedown', ({button}) => {
  const keyCode = 0 - button
  const {keys} = Controller

  if(keys.indexOf(keyCode) !== -1)
    return null

  keys.push(keyCode)
  Controller.emit(keyCode)
})

window.addEventListener('keyup', ({keyCode}) => {
  const {keys} = Controller
  
  if(keys.indexOf(keyCode) === -1)
    return null

  
  keys.splice(keys.indexOf(keyCode), 1)
})


window.addEventListener('mouseup', ({button}) => {
  const keyCode = 0 - button
  const {keys} = Controller
  
  if(keys.indexOf(keyCode) === -1)
    return null

  keys.splice(keys.indexOf(keyCode), 1)
})