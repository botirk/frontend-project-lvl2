import { resolve } from 'path';
import { testMe, testMePlain, testMeJSON } from '../src/testHelper';

const relPath1 = '__fixtures__/dif_before.json';
const relPath2 = '__fixtures__/dif_after.json';
const relPathResult = '__fixtures__/dif_output';
testMe('plain .json', relPath1, relPath2, relPathResult);

const absPath1 = resolve(relPath1);
const absPath2 = resolve(relPath2);
const absPathResult = resolve(relPathResult);
testMe('abs path', absPath1, absPath2, absPathResult);

const relPath1n = '__fixtures__/nested_dif_before.json';
const relPath2n = '__fixtures__/nested_dif_after.json';
const relPathResultn = '__fixtures__/nested_dif_output';
testMe('nested .json', relPath1n, relPath2n, relPathResultn);

const relPathResultp = '__fixtures__/plain_output';
testMePlain('(--format plain) .json', relPath1n, relPath2n, relPathResultp);

const relPathResultj = '__fixtures__/json_output.json';
testMeJSON('(--format json) .json', relPath1n, relPath2n, relPathResultj);
