import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

if (formatName === 'stylish') {
  result = stylish(diff(parseDataFile1, parseDataFile2));
} else if (formatName === 'plain') {
  result = plain(diff(parseDataFile1, parseDataFile2));
} else if (formatName === 'json') {
  result = json(diff(parseDataFile1, parseDataFile2));
}
