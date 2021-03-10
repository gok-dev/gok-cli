const loading = require('loading-cli')

const load = (text, color) => {
  const config = {
    text: text || '',
    color: color || 'cyan',
    interval: 200,
    stream: process.stdout,
    frames: ["◐", "◓", "◑", "◒"]
  }

  if (text) {
    return loading(config).start()
  }

  return loading(config).stop()
}

module.exports = load