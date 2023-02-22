import _ from 'lodash';

const indent = (depth, replacer = '    ') => replacer.repeat(depth);

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const result = Object.entries(data)
    .map(([key, value]) => `${indent(depth + 1, replacer)}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{', ...result, `${indent(depth, replacer)}}`].join('\n');
};

const iter = (tree, depth, replacer = '    ') => tree.map((node) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth, replacer).slice(2)}+ ${node.key}: ${stringify(node.value, depth, replacer)}`;
    case 'deleted':
      return `${indent(depth, replacer).slice(2)}- ${node.key}: ${stringify(node.value, depth, replacer)}`;
    case 'notChanged':
      return `${indent(depth, replacer).slice(2)}  ${node.key}: ${stringify(node.value, depth, replacer)}`;
    case 'changed':
      return [`${indent(depth, replacer).slice(2)}- ${node.key}: ${stringify(node.value1, depth, replacer)}`,
        `${indent(depth, replacer).slice(2)}+ ${node.key}: ${stringify(node.value2, depth, replacer)}`].join('\n');
    case 'nested':
      return `${indent(depth, replacer)}${node.key}: ${['{', ...iter(node.children, depth + 1), `${indent(depth, replacer)}}`].join('\n')}`;
    default:
      throw new Error(`Type: ${node.type} is undefined`);
  }
});

const getStylish = (diff) => {
  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default getStylish;
