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

  const diff = (data1, data2) => {
    const diffTree = [];
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);
    const sortKeys = _.sortBy(keys);

    sortKeys.forEach((key) => {
      if (!Object.hasOwn(data1, key)) {
        diffTree.push({ [key]: { diffType: 'added (+)', value: data2[key] } });
      } else if (!Object.hasOwn(data2, key)) {
        diffTree.push({ [key]: { diffType: 'deleted (-)', value: data1[key] } });
      } else if ((_.isObject(data1[key])) && (_.isObject(data2[key]))) {
        diffTree.push({ [key]: diff(data1[key], data2[key]) });
      } else if ((!_.isObject(data1[key])) && (!_.isObject(data2[key]))) {
        if (data1[key] !== data2[key]) {
          diffTree.push({ [key]: { diffType: 'changed (- -> +)', value1: data1[key], value2: data2[key] } });
        } else {
          diffTree.push({ [key]: { diffType: 'unchanged (null)', value: data1[key] } });
        }
      } else {
        diffTree.push({ [key]: { diffType: 'changed (- -> +)', value1: data1[key], value2: data2[key] } });
      }
      /* if (!Object.hasOwn(data1, key)) {
        diffTree[key] = `+ ${data2[key]}`;
      } else if (!Object.hasOwn(data2, key)) {
        diffTree[key] = `- ${data1[key]}`;
      } else if ((_.isObject(data1[key])) && (_.isObject(data2[key]))) {
        diffTree[key] = diff(data1[key], data2[key]);
      } else if ((!_.isObject(data1[key])) && (!_.isObject(data2[key]))) {
        if (data1[key] !== data2[key]) {
          diffTree[key] = [`- ${data1[key]}`, `+ ${data2[key]}`];
        } else {
          diffTree[key] = `  ${data1[key]}`;
        }
      } else {
        diffTree[key] = [`- ${data1[key]}`, `+ ${data2[key]}`];
      } */
    });
    return diffTree;
  };
  const result = diff(parseDataFile1, parseDataFile2);
  console.log(result);
  return result;
};

export default genDiff;
