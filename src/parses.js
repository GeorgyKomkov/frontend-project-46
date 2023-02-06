import yaml from 'js-yaml';

const parse = (fileContent, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file extension: '${extension}'! Try another extension.`);
  }
};
export default parse;
