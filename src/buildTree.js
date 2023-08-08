import _ from 'lodash';

const diff = (data1, data2) => {
  const diffTree = [];
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(keys);

  sortKeys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      diffTree.push({ [key]: { diffType: 'added (+)', value1: data2[key] } });
    } else if (!Object.hasOwn(data2, key)) {
      diffTree.push({ [key]: { diffType: 'deleted (-)', value1: data1[key] } });
    } else if ((_.isObject(data1[key])) && (_.isObject(data2[key]))) {
      diffTree.push({ [key]: diff(data1[key], data2[key]) });
    } else if ((!_.isObject(data1[key])) && (!_.isObject(data2[key]))) {
      if (data1[key] !== data2[key]) {
        diffTree.push({ [key]: { diffType: 'changed (- -> +)', value1: data1[key], value2: data2[key] } });
      } else {
        diffTree.push({ [key]: { diffType: 'unchanged (null)', value1: data1[key] } });
      }
    } else {
      diffTree.push({ [key]: { diffType: 'changed (- -> +)', value1: data1[key], value2: data2[key] } });
    }
  });
  return diffTree;
};

export default diff;
