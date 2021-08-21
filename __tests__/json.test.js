import { resolve } from 'path';
import { testMe, testMePlain, testMeJSON } from './testHelper';
import {
  difBeforeJSON, difAfterJSON, difOutput,
  difBeforeNestedJSON, difAfterNestedJSON,
  difOutputNested, difOutputPlain, difOutputJSON,
} from './paths';

testMe('plain .json', difBeforeJSON, difAfterJSON, difOutput);

testMe('abs path plain .json', resolve(difBeforeJSON), resolve(difAfterJSON), resolve(difOutput));

testMe('nested .json', difBeforeNestedJSON, difAfterNestedJSON, difOutputNested);

testMePlain('(--format plain) .json', difBeforeNestedJSON, difAfterNestedJSON, difOutputPlain);

testMeJSON('(--format json) .json', difBeforeNestedJSON, difAfterNestedJSON, difOutputJSON);
