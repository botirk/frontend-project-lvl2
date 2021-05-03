import fs from 'fs';
import dif from './index';
// it will parse JSON into easy format
const stringHas = (strings) => strings.split(/\r?\n/).map((str) => str.trim()).filter((str) => str.length > 0).map((str) => {
  const result = { str };
  if (str === '{') {
    result.start = str;
    return result;
  }
  if (str === '}') {
    result.finish = str;
    return result;
  }
  if (str[0] === '-') {
    [[result.deleted]] = str;
    str = str.slice(1).trim();
  }

  if (str[0] === '+') {
    [[result.created]] = str;
    str = str.slice(1).trim();
  }
  const colon = str.search(':');
  if (colon === -1) throw new Error(': colon not found');
  result.colon = str[colon];

  const key = str.slice(0, colon).trim();
  result.key = key;

  result.hash = () => {
    let subresult = '';
    subresult += result.deleted ?? '';
    subresult += result.created ?? '';
    subresult += result.key ?? '';
    return subresult;
  };

  const afterColon = str.slice(colon + 1).trim();
  if (afterColon === '{') {
    result.startsChildren = true;
    return result;
  }
  result.value = afterColon;
  return result;
});
// it will parse stringHase result, to even more easier format
const toPaths = (stringHasReturn) => {
  const result = {};
  const path = [];
  stringHasReturn.forEach((str) => {
    if (str.finish !== undefined) path.pop();
    else if (str.hash === undefined) return undefined;
    else if (str.startsChildren === true) path.push(str.key);
    else {
      const basePath = path.join('.');
      if (basePath.length > 0) result[`${basePath}.${str.hash()}`] = str.value;
      else result[str.hash()] = str.value;
    }
  });
  return result;
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
