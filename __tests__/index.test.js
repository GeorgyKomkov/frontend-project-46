import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const excpectedStylish = readFile('correct_stylish.txt');
const excpectedPlain = readFile('correct_plain.txt');
const excpectedJson = readFile('correct_json.txt');

test('Format stylish, ext - json', () => {
  const result = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  );
  expect(result).toEqual(excpectedStylish);
});

test('Format stylih, ext - yaml / yml', () => {
  const result = genDiff(
    getFixturePath('file1.yaml'),
    getFixturePath('file2.yml'),
  );
  expect(result).toEqual(excpectedStylish);
});

test('Format plain, ext-json', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toEqual(excpectedPlain);
});

test('Format plain, ext - yaml / yml', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
  expect(result).toEqual(excpectedPlain);
});

test('Format json, ext-json', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(result).toEqual(excpectedJson);
});

test('Format json, ext - yaml / yml', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json');
  expect(result).toEqual(excpectedJson);
});

test('Unsupported extension', () => {
  expect(() => {
    genDiff(getFixturePath('file2.yml'), getFixturePath('file2.txt'));
  }).toThrow(new Error('Unsupported file extension: \'.txt\'! Try another extension.'));
});

test('Using an unsupported format', () => {
  expect(() => {
    genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'unsupported');
  }).toThrow(new Error('Invalid format: \'unsupported\'! Use a different format.'));
});
