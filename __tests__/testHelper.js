/* eslint-disable jest/no-export, jest/valid-title */
import fs from 'fs';
import _ from 'lodash';
import dif from '../src/index';

// it will parse JSON into easy format
const stringHas = (strings) => strings.split(/\r?\n/).map((str) => str.trim()).filter((str) => str.length > 0).map((str) => {
  const preresult1 = {
    str,
    start: (str === '{') ? '{' : undefined,
    finish: (str === '}') ? '}' : undefined,
  };
  if (preresult1.start || preresult1.finish) return preresult1;

  const preresult2 = {
    deleted: (str[0] === '-') ? str : undefined,
    created: (str[0] === '+') ? str : undefined,
  };
  const plusORminus = (preresult2.deleted || preresult2.created) ? 1 : 0;

  const colon = str.search(':');
  if (colon === -1) throw new Error(': colon not found');
  const preresult3 = {
    colon: str[colon],
    key: str.slice(plusORminus, colon).trim(),
  };
  if (preresult3.key.length === 0) throw new Error('key not found');

  const preresult4 = {
    hash: () => (preresult2.deleted ?? '')
      + (preresult2.created ?? '')
      + preresult3.key,
    afterColon: str.slice(colon + 1).trim(),
  };

  const startsChildren = (preresult4.afterColon === '}');
  const preresult5 = {
    startsChildren,
    value: (startsChildren === true) ? undefined : preresult4.afterColon,
  };
  return _.merge(preresult1,
    _.merge(preresult2,
      _.merge(preresult3,
        _.merge(preresult4, preresult5))));
});

// it will parse stringHase result, to even easier format
const toPaths = (stringHasReturn) => {
  const result = stringHasReturn.reduce((acc, str) => {
    if (str.finish !== undefined) {
      return { result: acc.result, path: acc.path.slice(0, -1) };
    }
    if (str.hash === undefined) {
      return acc;
    }
    if (str.startsChildren === true) {
      return { result: acc.result, path: acc.path.concat(str.key) };
    }
    const basePath = acc.path.join('.');
    if (basePath.length > 0) {
      const newKey = `${basePath}.${str.hash()}`;
      return { result: { ...acc.result, [newKey]: str.value }, path: acc.path };
    } return { result: { ...acc.result, [str.hash()]: str.value }, path: acc.path };
  }, { result: {}, path: [] });
  return result.result;
};

// DRY
export const testMe = (name, beforeFile, afterFile, expectedFile) => {
  test(name, () => {
    const result = dif(beforeFile, afterFile);
    const transformedResult = toPaths(stringHas(result));

    const expected = fs.readFileSync(expectedFile, 'utf-8');
    const transformedExpected = toPaths(stringHas(expected));

    expect(transformedResult).toEqual(transformedExpected);
  });
};

const normalize = (result) => result.split(/\r?\n/).map((str) => str.trim()).filter((str) => str.length > 0);

export const testMePlain = (name, beforeFile, afterFile, expectedFile) => {
  test(name, () => {
    const result = dif(beforeFile, afterFile, 'plain');
    const transformedResult = normalize(result);

    const expected = fs.readFileSync(expectedFile, 'utf-8');
    const transformedExpected = normalize(expected);

    transformedExpected.forEach((line) => expect(transformedResult).toContain(line));
  });
};

export const testMeJSON = (name, beforeFile, afterFile, expectedFile) => {
  test(name, () => {
    const result = dif(beforeFile, afterFile, 'json');
    const transformedResult = JSON.parse(result);

    const expected = fs.readFileSync(expectedFile, 'utf-8');
    const transformedExpected = JSON.parse(expected);

    expect(transformedResult).toEqual(transformedExpected);
  });
};
