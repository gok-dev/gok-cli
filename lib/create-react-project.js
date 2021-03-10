const inquirer = require('inquirer')
const shell = require('shelljs')
const chalk = require('chalk')
const { initCreateProject } = require('./utils/messages')

const createReactProject = async (type, template) => {
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

  if (template) {
    command = shell.exec(`npx create-react-app ${answers.projectName} --template ${template}`)
  } else {
    command = shell.exec(`npx create-react-app ${answers.projectName}`)
  }

  if (!command.code) {
    console.log()
    console.log()
    console.log(chalk.green(`🚀  Seu ${type} criado com sucesso!`))
  } else {
    console.log(chalk.red('Não foi possivel criar o projeto, verifique o erro acima e tente novamente!'))
  }
}

module.exports = createReactProject
