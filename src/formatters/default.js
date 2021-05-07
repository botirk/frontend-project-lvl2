/* eslint-disable import/extensions, camelcase, no-use-before-define */
import _ from 'lodash';
import { typeofEx } from '../buildDif.js';

// visualize default
const tab = ' ';
const genStr = (tabLevel, str) => {
  const result = tab.repeat(tabLevel * 4) + str;
  if (result[result.length - 1] === '\n') return result;
  return `${result}\n`;
};
const genStart = (tabLevel = 0) => genStr(tabLevel, '{');
const genFinish = (tabLevel) => genStr(tabLevel, '}');
// required rewrite
const stringify2 = (tabLevel, obj) => genStart() + entries2(obj).reduce((acc, [k, v]) => {
  if (typeofEx(v) === 'object') return acc + genStr(tabLevel + 1, `${k}: ${stringify2(tabLevel + 1, v)}`);
  return acc + genStr(tabLevel + 1, `${k}: ${v}`);
}, '') + genFinish(tabLevel);
export const entries2 = (obj) => _.sortBy(Object.entries(obj), (a) => a[0]);
export const values2 = (obj) => entries2(obj).map(([, v]) => v);

const object_sign = (tabLevel, k, v, sign) => {
  const vRE = (sign === '+') ? v.valueAfter : v.valueBefore;
  return genStr(tabLevel, `  ${sign} ${k}: ${stringify2(tabLevel + 1, vRE)}`);
};

const object_created = (tabLevel, k, v) => object_sign(tabLevel, k, v, '+');
const created = (tabLevel, k, v) => genStr(tabLevel, `  + ${k}: ${v.valueAfter}`);

const object_deleted = (tabLevel, k, v) => object_sign(tabLevel, k, v, '-');
const deleted = (tabLevel, k, v) => genStr(tabLevel, `  - ${k}: ${v.valueBefore}`);

const object_unchanged = (tabLevel, k, v) => genStr(tabLevel + 1, `${k}: ${stringify2(tabLevel + 1, v.valueAfter)}`);
const unchanged = (tabLevel, k, v) => genStr(tabLevel, `    ${k}: ${v.valueAfter}`);

const object_changed = (tabLevel, k, v) => genStr(tabLevel + 1, `${k}: ${visualize(v.changedChild, tabLevel + 1)}`);
const object_changed_1 = (tabLevel, k, v) => (
  object_deleted(tabLevel, k, v) + created(tabLevel, k, v)
);
const object_changed_2 = (tabLevel, k, v) => (
  deleted(tabLevel, k, v) + object_created(tabLevel, k, v)
);
const changed = (tabLevel, k, v) => (
  deleted(tabLevel, k, v) + created(tabLevel, k, v)
);

const visual = {
  object_created,
  created,
  object_deleted,
  deleted,
  object_unchanged,
  unchanged,
  changed,
  object_changed_1,
  object_changed_2,
  object_changed,
};

const visualize = (difs, tabLevel = 0) => {
  const result = genStart() + entries2(difs).reduce((acc, [k, v]) => {
    if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
    return acc + visual[v.dif](tabLevel, k, v);
  }, '') + genFinish(tabLevel);
  return result.trim();
};

export default visualize;
