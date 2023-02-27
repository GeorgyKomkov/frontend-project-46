/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import _ from 'lodash';

const indent = (depth, isFull = false) => {
  if (isFull) {
    return ' '.repeat(4 * depth).slice(2);
  }
  return ' '.repeat(4 * depth);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const result = Object.entries(data)
    .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);

  return `${'{'}\n${result.flat().join('\n')}\n${indent(depth)}${'}'}`;
};

const iter = (tree, depth) => tree.map((node) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth, true)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${indent(depth, true)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'notChanged':
      return `${indent(depth, true)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed':
      const output1 = `${indent(depth, true)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const output2 = `${indent(depth, true)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${output1}\n${output2}`;
    case 'nested':
      return `${indent(depth)}${node.key}: ${'{'}\n${iter(node.children, depth + 1).flat().join('\n')}\n${indent(depth)}${'}'}`;
    default:
      throw new Error(`Type: ${node.type} is undefined`);
  }
});

const getStylish = (diff) => {
  const stylishDiff = iter(diff, 1);
  return `${'{'}\n${stylishDiff.flat().join('\n')}\n${'}'}`;
};

export default getStylish;
