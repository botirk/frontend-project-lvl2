import { testMe, testMePlain, testMeJSON } from './testHelper';
import {
  difBeforeYAML, difAfterYAML, difOutput,
  difBeforeNestedYAML, difAfterNestedYAML,
  difOutputNested, difOutputPlain, difOutputJSON,
} from './paths.js';

testMe('plain .yaml', difBeforeYAML, difAfterYAML, difOutput);

testMe('nested .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputNested);

testMePlain('(--format plain) .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputPlain);

testMeJSON('(--format json) .yaml', difBeforeNestedYAML, difAfterNestedYAML, difOutputJSON);
