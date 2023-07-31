import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // __tests__

const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');

test('generate difference between JSONs files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual(result);
});

test('generate difference between YML/YAMLs files', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yaml'))).toEqual(result);
});

test('generate difference between JSON and YML/YAML files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.yaml'))).toEqual(result);
});
