import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import getParsedExt from './parses.js';
import getFormat from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(filepath);
const getData = (absolutePath) => fs.readFileSync(absolutePath);
const getExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePathFile1 = getAbsolutePath(filepath1);
  const absolutePathFile2 = getAbsolutePath(filepath2);
  const file1 = getParsedExt(getData(absolutePathFile1), getExtension(absolutePathFile1));
  const file2 = getParsedExt(getData(absolutePathFile2), getExtension(absolutePathFile2));
  const result = buildTree(file1, file2);
  return getFormat(result, format);
};

export default genDiff;
