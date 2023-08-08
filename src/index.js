import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';
import buildTree from './buildTree.js';

const getTypeFile = (filepath) => extname(filepath).slice(1);
const getData = (filepath) => parse(readFileSync(filepath, 'utf-8'), getTypeFile(filepath));
const buildFullPath = (filepath) => resolve(filepath);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const dataFile1 = getData(buildFullPath(filePath1));
  const dataFile2 = getData(buildFullPath(filePath2));
  const diff = buildTree(dataFile1, dataFile2);
  return formatDiff(diff, formatName);
};

export default genDiff;
