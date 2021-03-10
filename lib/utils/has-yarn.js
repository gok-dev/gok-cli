const shell = require('shelljs')

const hasYarn = () => {
  try {
    const { code } = shell.exec('yarnpkg --version')

    if (code === 0) return true
    
    return false
  } catch (err) {
    return false
  }
}

module.exports = hasYarn