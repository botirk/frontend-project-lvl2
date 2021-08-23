import { testMe, testMePlain } from './testHelper';
import {
  hexletBeforeJSON, hexletAfterJSON, hexletOutput,
  hexletOutputPlain, hexletBeforeYAML, hexletAfterYAML,
} from './paths';

testMe('hexlet .json', hexletBeforeJSON, hexletAfterJSON, hexletOutput);

testMePlain('(--format plain) hexlet .json', hexletBeforeJSON, hexletAfterJSON, hexletOutputPlain);

testMe('hexlet .yml', hexletBeforeYAML, hexletAfterYAML, hexletOutput);

testMePlain('(--format plain) hexlet .yml', hexletBeforeYAML, hexletAfterYAML, hexletOutputPlain);
