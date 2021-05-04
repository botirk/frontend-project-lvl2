import { testMe } from '../src/testHelper';

const relPath1 = '__fixtures__/hexlet/file1.json';
const relPath2 = '__fixtures__/hexlet/file2.json';
const relPathResult = '__fixtures__/hexlet/result_stylish.txt';
testMe('hexlet .json', relPath1, relPath2, relPathResult);

const relPath1y = '__fixtures__/hexlet/file1.yml';
const relPath2y = '__fixtures__/hexlet/file2.yml';
const relPathResulty = relPathResult;
testMe('hexlet .yml', relPath1y, relPath2y, relPathResulty);