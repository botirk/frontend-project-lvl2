#!/usr/bin/env node
/* eslint-disable no-console, import/extensions */
import commanderjs from 'commander';
import genDiff from '../src/index.js';

const { Command } = commanderjs;

const program = new Command();

program.version('1.0.0')
  .name('gendiff')
  .arguments('<firstConfigPath> <secondConfigPath>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .action((first, second) => {
    console.log(genDiff(first, second, program.opts().format));
  })
  .addHelpText('after', 'available file types: .json .ini .yaml .yml')
  .addHelpText('after', 'availalbe output formats: stylish plain json');

program.parse(process.argv);
