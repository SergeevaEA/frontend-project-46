#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const extension1 = filePath1.split('.').at(-1);
    const extension2 = filePath2.split('.').at(-1);
    if ((extension1 === 'json') && (extension2 === 'json')) {
      genDiff(filePath1, filePath2);
    }
  });

program.parse(process.argv);