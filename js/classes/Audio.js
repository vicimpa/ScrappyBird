export class AudioFile {
  #audio = new Audio()

  get audio() {
    return this.#audio
  }

  async play() {
    const node = new Audio()
    node.src = this.audio.src
    await node.play()
    // node.src = ''
  }

  static async load(src = '') {
    return new Promise((r, rej) => {
      const audio = new AudioFile()
      const audioEl = audio.audio

       r(audio)

      audioEl.src = src
    })
  }
}