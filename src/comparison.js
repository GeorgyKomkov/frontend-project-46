import _ from 'lodash';

const getComparison = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`  + ${key}: ${obj2[key]}\n`);
    } else if (!Object.hasOwn(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  - ${key}: ${obj1[key]} \n  + ${key}: ${obj2[key]}\n`);
    } else {
      acc.push(`    ${key}:${obj1[key]}\n`);
    }
    return acc;
  }, []);
  return `{\n${result.join('')}}`;
};

export default getComparison;