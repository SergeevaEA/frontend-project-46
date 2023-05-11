import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = resolve(filePath1);
  const fullPath2 = resolve(filePath2);

  const dataFile1 = readFileSync(fullPath1, 'utf-8');
  const dataFile2 = readFileSync(fullPath2, 'utf-8');

  const parseDataFile1 = JSON.parse(dataFile1);
  const parseDataFile2 = JSON.parse(dataFile2);

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
