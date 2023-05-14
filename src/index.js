import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = resolve(filePath1);
  const fullPath2 = resolve(filePath2);

  const extension1 = extname(filePath1).slice(1);
  const extension2 = extname(filePath2).slice(1);

  const dataFile1 = readFileSync(fullPath1, 'utf-8');
  const dataFile2 = readFileSync(fullPath2, 'utf-8');

  const parseDataFile1 = parsers(dataFile1, extension1);
  const parseDataFile2 = parsers(dataFile2, extension2);

  const keys1 = Object.keys(parseDataFile1);
  const keys2 = Object.keys(parseDataFile2);
  const keys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(keys);

  const properties = [];

  sortKeys.forEach((key) => {
    if (!Object.hasOwn(parseDataFile1, key)) {
      properties.push(`  + ${key}: ${parseDataFile2[key]}`);
    } else if (!Object.hasOwn(parseDataFile2, key)) {
      properties.push(`  - ${key}: ${parseDataFile1[key]}`);
    } else if (parseDataFile1[key] !== parseDataFile2[key]) {
      properties.push(`  - ${key}: ${parseDataFile1[key]}`);
      properties.push(`  + ${key}: ${parseDataFile2[key]}`);
    } else {
      properties.push(`    ${key}: ${parseDataFile1[key]}`);
    }
  });

  const result = `{\n${properties.join('\n')}\n}`;
  return result;
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

export default genDiff;
