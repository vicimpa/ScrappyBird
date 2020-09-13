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
  const { AudioFile } = await import('./classes/Audio.js')
  const { Game } = await import('./classes/Game.js')
  const { Ground } = await import('./classes/Ground.js')
  const { Bird } = await import('./classes/Bird.js')
  const { Pipe } = await import('./classes/Pipe.js')
  const { Controller } = await import('./classes/Controller.js')

  const bgImage = await loadImage('./img/bg.png')
  const fgImage = await loadImage('./img/fg.png')
  const birdImage = await loadImage('./img/bird.png')
  const pipeUpImage = await loadImage('./img/pipeUp.png')
  const pipeDownImage = await loadImage('./img/pipeBottom.png')

  const scoreSound = await AudioFile.load('./audio/score.mp3')
  const flySound = await AudioFile.load('./audio/fly.mp3')

  const game = new Game('#game')
  

  function generate() {
    const bg = new Ground(game, bgImage, -0.5)
    const fg = new Ground(game, fgImage, -1.5)
    const bird = new Bird(game, birdImage, 105, 250)

    Pipe.imgUp = pipeUpImage
    Pipe.imgDown = pipeDownImage
    Pipe.fg = fg
    Pipe.bird = bird

    Pipe.sound = {
      fly: flySound,
      score: scoreSound
    }

    Pipe.createPipe(game)
  }

  generate()

  Controller.subscribe((e) => {
    if(e != 32 && e != 0)
      return

    Pipe.bird.jump()
    flySound.play()

    if(!game.run) {
      game.clear()
      generate()
      game.start()
    }
  })

  game.render()
}

main().catch(console.error)