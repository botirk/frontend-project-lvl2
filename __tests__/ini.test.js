import { testMe, testMePlain, testMeJSON } from './testHelper';
import { difBeforeINI, difAfterINI, difOutput } from './paths';
import { difBeforeNestedINI, difAfterNestedINI, difOutputNested, difOutputPlain, difOutputJSON } from './paths';

testMe('plain .ini', difBeforeINI, difAfterINI, difOutput);

testMe('nested .ini', difBeforeNestedINI, difAfterNestedINI, difOutputNested);

testMePlain('(--format plain) .ini', difBeforeNestedINI, difAfterNestedINI, difOutputPlain);

testMeJSON('(--format json) .ini', difBeforeNestedINI, difAfterNestedINI, difOutputJSON);
