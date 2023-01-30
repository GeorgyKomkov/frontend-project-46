import yaml from 'js-yaml';

const getParsedExt = (fileContent, extension) => {
  // switch (extension) {
  //   case '.json':
  //     return JSON.parse(fileContent);
  //   case 'yml':
  //   case 'yaml':
  //     return yaml.load(fileContent);
  //   default:
  //     throw new Error(`Unsupported file extension: '${extension}'! Try another extension.`);
  // }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(fileContent);
  }
  if (extension === '.json') {
    return JSON.parse(fileContent);
  }
  throw new Error(`Unsupported file extension: '${extension}'! Try another extension.`);
};
export default getParsedExt;
