#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program.version('1.0.0')
  .name("gendiff")
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((first, second) => {
    console.log(genDiff(first, second, program.opts().format ?? 'default'));
  });
program.parse(process.argv);
