import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const getFormat = (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return getStylish(data, replacer);
    case 'plain':
      return getPlain(data, replacer);
    case 'json':
      return getJson(data, null, replacer);
    default:
      throw new Error(`Invalid format: '${format}'! Use a different format.`);
  }
};

export default getFormat;
