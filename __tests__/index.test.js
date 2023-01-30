import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare two flat files  extension .json', () => {
  const result = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  );
  const excpectedResult = readFile('correct_comparison.txt');
  expect(result).toEqual(excpectedResult);
});

test('compare two flat files  extension .yaml / .yml', () => {
  const result = genDiff(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yml'),
  );
  const excpectedResult = readFile('correct_comparison.txt');
  expect(result).toEqual(excpectedResult);
});

test('compare two flat files with unsupported extension', () => {
  expect(() => {
    genDiff(getFixturePath('file2.yml'), getFixturePath('file2.txt'));
  }).toThrow(new Error('Unsupported file extension: \'.txt\'! Try another extension.'));
});
