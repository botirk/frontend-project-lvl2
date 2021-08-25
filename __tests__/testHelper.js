/* eslint-disable jest/no-export, jest/valid-title */
import fs from 'fs';
import _ from 'lodash';
import dif from '../src/index';

// helpers for parseString
const splitStr = (str) => str.split(/[\r\n]/);
const trimStrings = (strs) => strs.map((str) => str.trim());
const filterStrings = (strs) => strs.filter((str) => str.length > 0);
const strToArray = (str) => filterStrings(trimStrings(splitStr(str)));

const parseBraces = (preresult) => _.merge(preresult, {
  start: (preresult.str === '{'),
  finish: (preresult.str === '}'),
});

const parseSign = (preresult) => {
  const deleted = (preresult.str[0] === '-');
  const created = (preresult.str[0] === '+');
  const deletedORcreated = (deleted || created);
  const sign = (deletedORcreated) ? preresult.str[0] : '';
  const str = (deletedORcreated) ? preresult.str.substring(1).trim() : preresult.str;

  return _.merge(preresult, {
    deleted, created, deletedORcreated, sign, str,
  });
};

const parseColon = (preresult) => {
  const colonPos = preresult.str.search(':');
  if (colonPos === -1) throw new Error(': colon not found');

  const key = preresult.str.slice(0, colonPos).trim();
  if (key.length === 0) throw new Error('key not found');

  const value = preresult.str.slice(colonPos + 1).trim();

  const children = (value === '{');

  const hash = preresult.sign + key;

  return _.merge(preresult, {
    key, value, children, hash,
  });
};

// it will parse default programm answer (required for testing)
const parseString = (text) => strToArray(text).map((str) => {
  // scan for braces
  const braces = parseBraces({ str });
  if (braces.start || braces.finish) return braces;

  // scan for plus or minus at start
  const sign = parseSign(braces);

  // scan for key, value, children and hash
  const colon = parseColon(sign);

  return colon;
});

// it will generate paths from parsedStrings, required to compare results
const generatePaths = (parsedStrings) => parsedStrings.reduce((acc, parsedString) => {
  // object started > ignore
  if (parsedString.start) return acc;
  // object finished > remove last path variable from array
  if (parsedString.finish) return { result: acc.result, path: acc.path.slice(0, -1) };

  // inside of braces, add value to result
  const resultKey = `${parsedString.sign}${acc.path.concat(parsedString.key).join('.')}`;
  const resultValue = parsedString.value;
  const resultPath = (parsedString.children) ? acc.path.concat(parsedString.key) : acc.path;

  return { result: { ...acc.result, [resultKey]: resultValue }, path: resultPath };
}, { result: {}, path: [] }).result;

// DRY
export const testMe = (name, beforeFile, afterFile, expectedFile) => {
  test(name, () => {
    const result = dif(beforeFile, afterFile);
    const transformedResult = generatePaths(parseString(result));

    const expected = fs.readFileSync(expectedFile, 'utf-8');
    const transformedExpected = generatePaths(parseString(expected));

    expect(transformedResult).toEqual(transformedExpected);
  });
};

export const testMePlain = (name, beforeFile, afterFile, expectedFile) => {
  test(name, () => {
    const result = dif(beforeFile, afterFile, 'plain');
    const transformedResult = strToArray(result);

    const expected = fs.readFileSync(expectedFile, 'utf-8');
    const transformedExpected = strToArray(expected);

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
