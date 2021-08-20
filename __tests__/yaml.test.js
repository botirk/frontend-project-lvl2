import { testMe, testMePlain, testMeJSON } from './testHelper';

const relPath1y = '__fixtures__/dif_before.yaml';
const relPath2y = '__fixtures__/dif_after.yaml';
const relPathResulty = '__fixtures__/dif_output';
testMe('plain .yaml', relPath1y, relPath2y, relPathResulty);

const relPath1ny = '__fixtures__/nested_dif_before.yaml';
const relPath2ny = '__fixtures__/nested_dif_after.yaml';
const relPathResultny = '__fixtures__/nested_dif_output';
testMe('nested .yaml', relPath1ny, relPath2ny, relPathResultny);

const relPathResultp = '__fixtures__/plain_output';
testMePlain('(--format plain) .yaml', relPath1ny, relPath2ny, relPathResultp);

const relPathResultj = '__fixtures__/json_output.json';
testMeJSON('(--format json) .yaml', relPath1ny, relPath2ny, relPathResultj);
