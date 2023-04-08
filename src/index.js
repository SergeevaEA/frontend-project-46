import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = resolve(filePath1, cwd());
  const dataFile1 = readFileSync(fullPath1, 'utf-8');

  const fullPath2 = resolve(filePath2, cwd());
  const dataFile2 = readFileSync(fullPath2, 'utf-8');
  
  const parseDataFile1 = JSON.parse(dataFile1);
  const parseDataFile2 = JSON.parse(dataFile2);
  console.log(parseDataFile1);
  console.log(parseDataFile2);
};

export default genDiff;