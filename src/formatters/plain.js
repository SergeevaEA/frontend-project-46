import _ from 'lodash';

const plain = (diffTree) => {
  const properties = [];
  Object.values(diffTree).forEach((value) => {
    Object.keys(value).forEach((key) => {
      let value1 = value[key].value1;
      let value2 = value[key].value2;
      if (!Array.isArray(value[key])) {
        if (_.isObject(value1)) {
          value1 = '[complex value]';
        }
        if (_.isObject(value2)) {
          value2 = ['complex value'];
        }
        if (value[key].diffType === 'added (+)') {
          properties.push(`Property '${key}' was added with value: '${value1}'`);
        } else if (value[key].diffType === 'deleted (-)') {
          properties.push(`Property '${key}' was removed`);
        } else if (value[key].diffType === 'changed (- -> +)') {
          properties.push(`Property '${key}' was updated. From ${value1} to ${value2}`);
        }
      } else {
        properties.push(plain(value[key]));
      }
    });
  });
  return `${properties.join('\n')}`;
};

export default plain;
