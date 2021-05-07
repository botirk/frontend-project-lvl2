/* eslint-disable import/extensions, camelcase, no-use-before-define */
import { typeofEx } from '../buildDif.js';
import { values2 } from './default.js';

const genStr = (str) => {
  if (str[str.length - 1] === '\n' || str.length === 0) return str;
  return `${str}\n`;
};
const translate = (value) => {
  switch (typeofEx(value)) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const object_created = (v) => `Property '${v.pathJoin()}' was added with value: ${translate(v.valueAfter)}`;
const created = object_created;

const object_deleted = (v) => `Property '${v.pathJoin()}' was removed`;
const deleted = object_deleted;

const object_unchanged = () => '';
const unchanged = object_unchanged;

const changed = (v) => `Property '${v.pathJoin()}' was updated. From ${translate(v.valueBefore)} to ${translate(v.valueAfter)}`;
const object_changed_1 = changed;
const object_changed_2 = changed;
const object_changed = (v) => visualize(v.changedChild);

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

const visualize = (difs) => values2(difs).reduce((acc, v) => {
  if (visual[v.dif] === undefined) throw new Error(`buildDif().dif: ${v.dif}; is not supported`);
  return acc + genStr(visual[v.dif](v));
}, '').trim();

export default visualize;
