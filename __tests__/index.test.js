import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff stylish, ext json', () => {
  const result = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  );
  const excpectedResult = readFile('correct_stylish.txt');
  expect(result).toEqual(excpectedResult);
});

test('gendiff stylih .yaml / .yml', () => {
  const result = genDiff(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yml'),
  );
  const excpectedResult = readFile('correct_stylish.txt');
  expect(result).toEqual(excpectedResult);
});

test('gendiff plain, ext-json', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const excpectedResult = readFile('correct_plain.txt');
  expect(result).toEqual(excpectedResult);
});

test('gendiff plain, ext-json', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
  const excpectedResult = readFile('correct_plain.txt');
  expect(result).toEqual(excpectedResult);
});

test('compare files with unsupported extension', () => {
  expect(() => {
    genDiff(getFixturePath('file2.yml'), getFixturePath('file2.txt'));
  }).toThrow(new Error('Unsupported file extension: \'.txt\'! Try another extension.'));
});

test('Using an unsupported format', () => {
  expect(() => {
    genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'unsupported');
  }).toThrow(new Error('Invalid format: \'unsupported\'! Use a different format.'));
});
