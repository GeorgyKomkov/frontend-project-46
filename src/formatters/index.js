import getStylish from './stylish.js';
import getPlain from './plain.js';

const getReport = (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return getStylish(data, replacer);
    case 'plain':
      return getPlain(data, replacer);
    case 'json':
      return JSON.stringify(data, null, replacer);
    default:
      throw new Error(`Invalid format: '${format}'! Use a different format.`);
  }
};

export default getReport;
