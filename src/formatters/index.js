import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormat = (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return getStylish(data, replacer);
    case 'plain':
      return getPlain(data, replacer);
    default:
      throw new Error(`Invalid format: '${format}'! Use a different format.`);
  }
};

export default getFormat;
