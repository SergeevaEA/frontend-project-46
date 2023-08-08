import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // __tests__

const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const stylishDiff = fs.readFileSync(`${__dirname}/../__fixtures__/stylishDiff.txt`, 'utf-8');
const plainDiff = fs.readFileSync(`${__dirname}/../__fixtures__/plainDiff.txt`, 'utf-8');

test('generate difference between JSONs files without formatter', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual(stylishDiff);
});

test('generate difference between YML/YAMLs files without formatter', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yaml'))).toEqual(stylishDiff);
});

test('generate difference between JSON and YML/YAML files without formatter', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.yaml'))).toEqual(stylishDiff);
});

test('generate difference with stylish formatter', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'stylish')).toEqual(stylishDiff);
});

test('generate difference with plain formatter', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'plain')).toEqual(plainDiff);
});

/* test('generate difference with json formatter', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'json')).toEqual(plainDiff);
}); */
