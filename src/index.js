import fs from 'fs';
import path from 'path';
import getComparison from './comparison.js';
import getParsedExt from './parses.js';

const getAbsolutePath = (filepath) => path.resolve(path.resolve(filepath));
const getData = (absolutePath) => fs.readFileSync(absolutePath);
const getExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  const absolutePathFile1 = getAbsolutePath(filepath1);
  const absolutePathFile2 = getAbsolutePath(filepath2);
  const file1 = getParsedExt(getData(absolutePathFile1), getExtension(absolutePathFile1));
  const file2 = getParsedExt(getData(absolutePathFile2), getExtension(absolutePathFile2));
  return getComparison(file1, file2);
};
// const genDiff = (filepath1, filepath2) => {
//   const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
//   const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
//   return getComparison(file1, file2);
// };
export default genDiff;
