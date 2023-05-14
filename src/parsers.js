import yaml from 'js-yaml';

export default (data, extension) => {
  let parseData;
  if (extension === 'json') {
    parseData = JSON.parse(data);
  } else if ((extension === 'yaml') || (extension === 'yml')) {
    parseData = yaml.load(data);
  }
  return parseData;
};
