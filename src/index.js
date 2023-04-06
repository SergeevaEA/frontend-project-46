import { readFileSync } from 'fs';

const genDiff = (filepath1, filepath2) => {
  const dataFile1 = readFileSync(filepath1, 'utf-8');
  const dataFile2 = readFileSync(filepath2, 'utf-8');
  console.log(JSON.parse(dataFile1));
  console.log(JSON.parse(dataFile2));
};

export default genDiff;