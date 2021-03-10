#!/usr/bin/env node
const program = require('commander')
const inquirer = require('inquirer')

const { verifyType } = require('./lib')

// Package
const package = require('./package.json')

// Utils
const types = require('./lib/utils/types')
const { showWelcome, initCreateProject } = require('./lib/utils/messages')

// CLI Version
program.version(package.version)

// Initialize Program
program
  .command('init')
  .description('Inicializa a CLI')
  .action(async () => {
    showWelcome()

    let answers
    
    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Escolha o tipo de projeto que deseja criar:',
        choices: types
      }
    ])

    verifyType(answers.type)
  })

program.parse(process.argv)