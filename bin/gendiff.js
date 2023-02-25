#!/usr/bin/env node

import { program } from 'commander';

const genDiff = (filepath1, filepath2, format) => {

};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')

program.parse();

const { args } = program;
const options = program.opts();
const { format } = options;

const diff = genDiff(args, format);
console.log(diff);
