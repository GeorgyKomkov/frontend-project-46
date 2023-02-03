import getStylish from './stylish.js';

const getFormat = (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return getStylish(data, replacer);
    default:
      throw new Error(`Invalid format: '.${format}'! Use a different format.`);
  }
};

export default getFormat;
