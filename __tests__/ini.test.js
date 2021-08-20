import { testMe, testMePlain, testMeJSON } from './testHelper';

const relPath1i = '__fixtures__/dif_before.ini';
const relPath2i = '__fixtures__/dif_after.ini';
const relPathResulti = '__fixtures__/dif_output';
testMe('plain .ini', relPath1i, relPath2i, relPathResulti);

const relPath1ni = '__fixtures__/nested_dif_before.ini';
const relPath2ni = '__fixtures__/nested_dif_after.ini';
const relPathResultni = '__fixtures__/nested_dif_output';
testMe('nested .ini', relPath1ni, relPath2ni, relPathResultni);

const relPathResultp = '__fixtures__/plain_output';
testMePlain('(--format plain) .ini', relPath1ni, relPath2ni, relPathResultp);

const relPathResultj = '__fixtures__/json_output.json';
testMeJSON('(--format json) .ini', relPath1ni, relPath2ni, relPathResultj);
