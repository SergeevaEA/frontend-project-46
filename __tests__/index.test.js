import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
// import { dirname, resolve, extname } from 'path';

test('generate difference between JSONs files', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});

test('generate difference between YML/YAMLs files', () => {
  
});

test('generate difference between JSON and YML/YAML files', () => {

});
