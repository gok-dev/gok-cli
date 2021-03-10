const stopProcess = (message) => {
  if (message) console.error(message)
  process.exit(1)
}

module.exports = stopProcess