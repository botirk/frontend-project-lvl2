import { testMe, testMePlain, testMeJSON } from './testHelper';
import { difBeforeYAML, difAfterYAML, difOutput } from './paths';
import { difBeforeNestedYAML, difAfterNestedYAML, difOutputNested, difOutputPlain, difOutputJSON } from './paths';

testMe('plain .yaml', difBeforeYAML, difAfterYAML, difOutput);

testMe('nested .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputNested);

const relPathResultp = '__fixtures__/plain_output.txt';
testMePlain('(--format plain) .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputPlain);

const relPathResultj = '__fixtures__/json_output.json';
testMeJSON('(--format json) .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputJSON);
