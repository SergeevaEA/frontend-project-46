import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('generate difference between JSONs files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});

test('generate difference between YML/YAMLs files', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yaml'))).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});

test('generate difference between JSON and YML/YAML files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.yaml'))).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});
