/* eslint-disable import/extensions, camelcase, no-use-before-define */
import _ from 'lodash';
import { typeofEx } from '../buildDif.js';

const tab = ' ';
const tabs = (tabLevel) => tab.repeat(tabLevel * 4);

const endStr = (str) => {
  if (str[str.length - 1] === '\n') return str;
  return `${str}\n`;
};

export const entriesSorted = (obj) => _.sortBy(Object.entries(obj), (a) => a[0]);

export const valuesSorted = (obj) => entriesSorted(obj).map(([, v]) => v);

// content inside of object
const stringify = (tabLevel, obj) => entriesSorted(obj).reduce((acc, [k, v]) => {
  if (typeofEx(v) === 'object') return acc + tabs(tabLevel + 1) + endStr(`${k}: ${stringifyBraced(tabLevel + 1, v)}`);
  return acc + tabs(tabLevel + 1) + endStr(`${k}: ${v}`);
}, '');

// content of object
const stringifyBraced = (tabLevel, obj) => `{\n${stringify(tabLevel, obj)}${tabs(tabLevel)}}`;

const object_withSign = (tabLevel, k, v, sign) => {
  const vRE = (sign === '+') ? v.valueAfter : v.valueBefore;
  return tabs(tabLevel + 0.5) + endStr(`${sign} ${k}: ${stringifyBraced(tabLevel + 1, vRE)}`);
};

const visual = {
  object_created: (tabLevel, k, v) => (
    object_withSign(tabLevel, k, v, '+')
  ),
  created: (tabLevel, k, v) => (
    tabs(tabLevel) + endStr(`  + ${k}: ${v.valueAfter}`)
  ),
  object_deleted: (tabLevel, k, v) => (
    object_withSign(tabLevel, k, v, '-')
  ),
  deleted: (tabLevel, k, v) => (
    tabs(tabLevel + 0.5) + endStr(`- ${k}: ${v.valueBefore}`)
  ),
  object_unchanged: (tabLevel, k, v) => (
    tabs(tabLevel + 1) + endStr(`${k}: ${stringifyBraced(tabLevel + 1, v.valueAfter)}`)
  ),
  unchanged: (tabLevel, k, v) => (
    tabs(tabLevel + 1) + endStr(`${k}: ${v.valueAfter}`)
  ),
  changed: (tabLevel, k, v) => (
    visual.deleted(tabLevel, k, v) + visual.created(tabLevel, k, v)
  ),
  object_changed_1: (tabLevel, k, v) => (
    visual.object_deleted(tabLevel, k, v) + visual.created(tabLevel, k, v)
  ),
  object_changed_2: (tabLevel, k, v) => (
    visual.deleted(tabLevel, k, v) + visual.object_created(tabLevel, k, v)
  ),
  object_changed: (tabLevel, k, v) => (
    tabs(tabLevel + 1) + endStr(`${k}: ${visualizeBraced(v.changedChild, tabLevel + 1)}`)
  ),
};

// content inside of object
const visualize = (difs, tabLevel) => entriesSorted(difs).reduce((acc, [k, v]) => {
  if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
  return acc + visual[v.dif](tabLevel, k, v);
}, '');

// content of object
const visualizeBraced = (difs, tabLevel = 0) => {
  const result = `{\n${visualize(difs, tabLevel)}${tabs(tabLevel)}}`;
  return result.trim();
};

export default visualizeBraced;
