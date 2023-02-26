import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return String(`'${value}'`);
  }
  return String(value);
};
const iter = (tree, parent) => tree.flatMap((node) => {
  const path = [...parent, node.key].join('.');
  switch (node.type) {
    case 'added':
      return `Property '${path}' was added with value: ${stringify(node.value)}`;
    case 'deleted':
      return `Property '${path}' was removed`;
    case 'notChanged':
      return [];
    case 'changed':
      return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'nested':
      return `${iter(node.children, [path]).join('\n')}`;
    default:
      throw new Error(`Type: ${node.type} is undefined`);
  }
});

const getPlain = (diff) => {
  const plainDiff = iter(diff, []).join('\n');
  return plainDiff;
};

export default getPlain;
