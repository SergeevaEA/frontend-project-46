import { readFileSync } from 'fs';
import { resolve } from 'path';

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = resolve(filePath1);
  const fullPath2 = resolve(filePath2);

  const dataFile1 = readFileSync(fullPath1, 'utf-8');
  const dataFile2 = readFileSync(fullPath2, 'utf-8');

  const parseDataFile1 = JSON.parse(dataFile1);
  const parseDataFile2 = JSON.parse(dataFile2);

  let result = '{\n';

  const entriesFile1 = Object.entries(parseDataFile1);
  const entriesFile2 = Object.entries(parseDataFile2);
  const allEntries = [...entriesFile1, ...entriesFile2];
  const sortEntries = allEntries.sort();
  for (let i = 0; i < sortEntries.length - 1; i += 1) {
    if (sortEntries[i][0] === sortEntries[i + 1][0]) {
      if (sortEntries[i][1] === sortEntries[i + 1][1]) {
        result += `    ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      } else if (Object.hasOwn(parseDataFile1, sortEntries[i][1])) {
        result += `  - ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
        result += `  + ${sortEntries[i + 1][0]}: ${sortEntries[i + 1][1]}\n`;
      } else {
        result += `  - ${sortEntries[i + 1][0]}: ${sortEntries[i + 1][1]}\n`;
        result += `  + ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      }
    } else if ((i !== 0) && (sortEntries[i - 1][0] !== sortEntries[i][0])) {
      if (Object.hasOwn(parseDataFile1, sortEntries[i][0])) {
        result += `  - ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      } else {
        result += `  + ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      }
    } else if (i === 0) {
      if (Object.hasOwn(parseDataFile1, sortEntries[i][0])) {
        result += `  - ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      } else {
        result += `  + ${sortEntries[i][0]}: ${sortEntries[i][1]}\n`;
      }
    }
  }
  if (sortEntries[sortEntries.length - 2][0] !== sortEntries[sortEntries.length - 1][0]) {
    if (Object.hasOwn(parseDataFile1, sortEntries[sortEntries.length - 1][0])) {
      result += `  - ${sortEntries[sortEntries.length - 1][0]}: ${sortEntries[sortEntries.length - 1][1]}\n`;
    } else {
      result += `  + ${sortEntries[sortEntries.length - 1][0]}: ${sortEntries[sortEntries.length - 1][1]}\n`;
    }
  }
  result += '}';
  return result;
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

export default genDiff;
