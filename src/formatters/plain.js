/* eslint-disable import/extensions, camelcase, no-use-before-define */
import { typeofEx } from '../buildDif.js';
import { valuesSorted, endStr } from './default.js';

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

const dispatcher = {
  object_created: (v) => (
    `Property '${v.pathJoin()}' was added with value: ${translate(v.valueAfter)}`
  ),
  created: (v) => dispatcher.object_created(v),
  object_deleted: (v) => (
    `Property '${v.pathJoin()}' was removed`
  ),
  deleted: (v) => dispatcher.object_deleted(v),
  object_unchanged: () => '',
  unchanged: () => '',
  changed: (v) => (
    `Property '${v.pathJoin()}' was updated. From ${translate(v.valueBefore)} to ${translate(v.valueAfter)}`
  ),
  object_changed_1: (v) => dispatcher.changed(v),
  object_changed_2: (v) => dispatcher.changed(v),
  object_changed: (v) => dispatcherize(v.changedChild),
};

const dispatcherize = (difs) => valuesSorted(difs).reduce((acc, v) => {
  if (dispatcher[v.dif] === undefined) throw new Error(`buildDif().dif: ${v.dif}; is not supported`);
  return acc + endStr(dispatcher[v.dif](v));
}, '').trim();

export default dispatcherize;
