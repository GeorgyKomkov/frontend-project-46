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
const resultFormStylExtJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const resultFormPlainExtJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
const resultFormJsonExtJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
const resultFormStylExtYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
const resyltFormPlainExtYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
const resultFormJsonExtYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json');
const resultFormStylExtJsonYaml = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
const resultFormPlainExtJsonYaml = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
const resultFormJsonExtJsonYaml = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json');

describe('comparison', () => {
  test('json & yaml/yml', () => {
    expect(resultFormStylExtJson).toEqual(excpectedStylish);
    expect(resultFormPlainExtJson).toEqual(excpectedPlain);
    expect(resultFormJsonExtJson).toEqual(excpectedJson);
    expect(resultFormStylExtYaml).toEqual(excpectedStylish);
    expect(resyltFormPlainExtYaml).toEqual(excpectedPlain);
    expect(resultFormJsonExtYaml).toEqual(excpectedJson);
    expect(resultFormStylExtJsonYaml).toEqual(excpectedStylish);
    expect(resultFormPlainExtJsonYaml).toEqual(excpectedPlain);
    expect(resultFormJsonExtJsonYaml).toEqual(excpectedJson);
  });

  test('the presence of an error', () => {
    expect(() => {
      genDiff(getFixturePath('file2.yml'), getFixturePath('file2.txt'));
    }).toThrow(new Error('Unsupported file extension: \'.txt\'! Try another extension.'));
    expect(() => {
      genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'unsupported');
    }).toThrow(new Error('Invalid format: \'unsupported\'! Use a different format.'));
  });
});
