import _ from 'lodash';

const getComparison = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`  + ${key}: ${obj2[key]}`);
    } else if (!Object.hasOwn(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);
    } else {
      acc.push(`    ${key}:${obj1[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default getComparison;
