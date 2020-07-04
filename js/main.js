/** @returns {HTMLImageElement} */
async function loadImage(src = '') {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = reject
    img.onabort = reject

    img.src = src
  })
}

async function main() {
  const bgImage = await loadImage('/img/bg.png')
  const fgImage = await loadImage('/img/fg.png')
  const birdImage = await loadImage('/img/bird.png')
  const pipeUpImage = await loadImage('/img/pipeUp.png')
  const pipeDownImage = await loadImage('/img/pipeBottom.png')

  const { Game } = await import('./classes/Game.js')
  const { Ground } = await import('./classes/Ground.js')
  const { Bird } = await import('./classes/Bird.js')
  const { Pipe } = await import('./classes/Pipe.js')
  const { Controller } = await import('./classes/Controller.js')

  const game = new Game('#game')

  function generate() {
    const bg = new Ground(game, bgImage, -0.5)
    const fg = new Ground(game, fgImage, -1.5)
    const bird = new Bird(game, birdImage, 105, 250)

    Pipe.imgUp = pipeUpImage
    Pipe.imgDown = pipeDownImage
    Pipe.fg = fg
    Pipe.bird = bird

    Pipe.createPipe(game)
  }

  generate()

  Controller.subscribe((e) => {
    if(e != 32 && e != 0)
      return

    if(!game.run) {
      game.clear()
      generate()
      game.start()
    }

    Pipe.bird.jump()
  })

  game.render()
}

main().catch(console.error)