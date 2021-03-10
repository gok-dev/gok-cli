const inquirer = require('inquirer')
const shell = require('shelljs')
const chalk = require('chalk')
const load = require('./utils/loading')
const hasYarn = require('./utils/has-yarn')
const stopProcess = require('./utils/stop-process')
const { initCreateProject } = require('./utils/messages')
const templates = require('./utils/templates')

const package = require('../package.json')

const installRNCli = () => {
  let installCli

  if (hasYarn()) {
    return installCli = shell.exec('yarn global add react-native-cli')
  }

  return installCli = shell.exec('npm install -g react-native-cli')
}

const createProjectWithCli = (answers, type) => {
  const runCommand = shell.exec(`react-native init ${answers.projectName} --template ${templates[0]}`)

  if (runCommand.code === 0) {
    console.log()
    console.log(chalk.green(`🚀  Seu ${type} foi criado com sucesso!`))
  } else {
    console.log(chalk.red('Ocorreu um erro ao criar o projeto, tente novamente!'))
    stopProcess()
  }
}

const createReactNativeProject = async (type, template) => {
  initCreateProject(type)

  let answers,
      command 
    
  answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Qual será o nome do projeto?',
      validate: value => value ? true : 'É obrigatório informar o nome do projeto!'
    }
  ])

  if (template && String(template).includes('basic')) {
    const rnIsInstall = shell.exec('react-native --version')
  
    if (rnIsInstall.stderr.includes('command not found')) {
      let questions

      questions = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmInstall',
          message: 'Precisaremos instalar a CLI do React Native para continuar com a criação deste projeto. Deseja continuar?',
        }
      ])

      if (!questions.confirmInstall) {
        console.log(chalk.red('Processo cancelado!'))
        console.log(chalk.hex('#35D330')(`Obrigado por utilizar a ${package.name}!`))
        return stopProcess()
      }

      const runInstall = installRNCli()

      if (runInstall.code === 0) {
        console.log()
        console.log(chalk.green('🚀  React Native CLI instalada com sucesso!'))

        createProjectWithCli(answers, type)
      } else {
        console.log()
        console.log(chalk.red('Algo deu errado ao instalar a CLI do React Native'))
        stopProcess()
      }
    } else {
      createProjectWithCli(answers, type)
    }
  } else {
    command = shell.exec(`npx react-native init ${answers.projectName} --template ${templates[4]}`)
  }

  if (command.code === 0) {
    console.log()
    console.log()
    console.log(chalk.green(`🚀  Seu ${type} foi criado com sucesso!`))
  } else {
    console.log()
    console.log(chalk.red('Não foi possivel criar o projeto!'))
  }
}

module.exports = createReactNativeProject