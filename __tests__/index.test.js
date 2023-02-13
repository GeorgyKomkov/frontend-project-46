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

describe('comparison', () => {
  test('json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2)).toEqual(excpectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(excpectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(excpectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(excpectedJson);
  });

  test('yaml/yml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yml');

    expect(genDiff(filepath1, filepath2)).toEqual(excpectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(excpectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(excpectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(excpectedJson);
  });

  test('the presence of an error', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yml');
    const filepath3 = getFixturePath('file2.txt');

    expect(() => genDiff(filepath2, filepath3)).toThrow(new Error('Unsupported file extension: \'.txt\'! Try another extension.'));
    expect(() => genDiff(filepath1, filepath2, 'unsupported')).toThrow(new Error('Invalid format: \'unsupported\'! Use a different format.'));
  });
});
