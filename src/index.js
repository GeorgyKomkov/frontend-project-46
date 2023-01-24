import fs from 'fs';
import path from 'path';
import getComparison from './comparison.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  return getComparison(file1, file2);
};

export default genDiff;