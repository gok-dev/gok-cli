const package = '../../package.json'

const checkRequirements = () => {
  const currentNodeVersion = process.versions.node
  const semver = currentNodeVersion.split('.')
  const major = semver[0]
  
  if (major < 10) {
    console.error(`Você está rodando o Node na versão ${currentNodeVersion}`)
    console.error(`${package.name} precisa do Node 10 ou superior`)
    console.error('Por favor você precisa atualizar a versão do Node')
    process.exit()
  }
}

module.exports = checkRequirements