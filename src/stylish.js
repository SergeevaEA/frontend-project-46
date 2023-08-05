import _ from 'lodash';

const stylishObjectValue = (obj, deep, repl = ' ', spCount = 4) => {
  const iter = (data, replacer, spacesCount, level) => {
    if (!_.isObject(data)) return `${data}`;
    const lines = Object.entries(data).map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${replacer.repeat(spacesCount * (level + deep))}${key}: ${value}`;
      }
      return `${replacer.repeat(spacesCount * (level + deep))}${key}: ${iter(value, repl, spCount, level + 1)}`;
    });
    const rawResult = lines.join('\n');
    return `{\n${rawResult}\n${replacer.repeat(spacesCount * (level + deep - 1))}}`;
  };
  return iter(obj, repl, spCount, 1);
};

const stylish = (diffTree) => {
  const iter = (data, level, replacer = ' ', spCount = 4) => {
    const properties = [];
    Object.values(data).forEach((value) => {
      Object.keys(value).forEach((key) => {
        let value1;
        let value2;
        if (!Array.isArray(value[key])) {
          value1 = value[key].value1;
          value2 = value[key].value2;
          if (_.isObject(value1)) {
            value1 = stylishObjectValue(value1, level);
          }
          if (_.isObject(value2)) {
            value2 = stylishObjectValue(value2, level);
          }
          if (value[key].diffType === 'added (+)') {
            properties.push(`${replacer.repeat(spCount * level - 2)}+ ${key}: ${value1}`);
          } else if (value[key].diffType === 'unchanged (null)') {
            properties.push(`${replacer.repeat(spCount * level - 2)}  ${key}: ${value1}`);
          } else if (value[key].diffType === 'deleted (-)') {
            properties.push(`${replacer.repeat(spCount * level - 2)}- ${key}: ${value1}`);
          } else if (value[key].diffType === 'changed (- -> +)') {
            properties.push(`${replacer.repeat(spCount * level - 2)}- ${key}: ${value1}\n${replacer.repeat(spCount * level - 2)}+ ${key}: ${value2}`);
          }
        } else {
          properties.push(`${replacer.repeat(spCount * level)}${key}: ${iter(value[key], level + 1)}`);
        }
      });
    });
    return `{\n${properties.join('\n')}\n${replacer.repeat(spCount * (level - 1))}}`;
  };
  return iter(diffTree, 1);
};

export default stylish;
