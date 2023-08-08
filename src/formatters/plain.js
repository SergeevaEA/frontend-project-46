import _ from 'lodash';

const makeStringValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `${value}` : String(value);
};

const plain = (diffTree) => {
  const iter = (tree, previousKey) => {
    const combinedKey = previousKey.length !== 0 ? `${previousKey.join('.')}${'.'}` : previousKey;
    const properties = [];
    Object.values(tree).forEach((value) => {
      Object.keys(value).forEach((key) => {
        const value1 = makeStringValue(value[key].value1);
        const value2 = makeStringValue(value[key].value2);
        if (!Array.isArray(value[key])) {
          previousKey = [];
          if (value[key].diffType === 'added (+)') {
            properties.push(`Property '${combinedKey}${key}' was added with value: '${value1}'`);
          } else if (value[key].diffType === 'deleted (-)') {
            properties.push(`Property '${combinedKey}${key}' was removed`);
          } else if (value[key].diffType === 'changed (- -> +)') {
            properties.push(`Property '${combinedKey}${key}' was updated. From ${value1} to ${value2}`);
          }
        } else {
          previousKey.push(key);
          properties.push(iter(value[key], previousKey));
        }
      });
    });
    return `${properties.join('\n')}`;
  };
  return iter(diffTree, []);
};

export default plain;
