import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('generate difference', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});