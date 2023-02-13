import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parses.js';
import getReport from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath);
const getData = (filepath) => {
  const patch = buildFullPath(filepath);
  return fs.readFileSync(patch);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(getData(filepath1), extractFormat(filepath1));
  const data2 = parse(getData(filepath2), extractFormat(filepath2));
  const tree = buildTree(data1, data2);
  return getReport(tree, format);
};

export default genDiff;
