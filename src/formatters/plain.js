/* eslint-disable import/extensions */
import { typeofEx } from '../buildDif.js';
import { values2 } from './default.js';

const visual = {};
visual.genStr = (str) => {
  if (str[str.length - 1] === '\n' || str.length === 0) return str;
  return `${str}\n`;
};
visual.translate = (value) => {
  switch (typeofEx(value)) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

visual.object_created = (v) => `Property '${v.pathJoin()}' was added with value: ${visual.translate(v.valueAfter)}`;
visual.created = visual.object_created;

visual.object_deleted = (v) => `Property '${v.pathJoin()}' was removed`;
visual.deleted = visual.object_deleted;

visual.object_unchanged = () => '';
visual.unchanged = visual.object_unchanged;

visual.changed = (v) => `Property '${v.pathJoin()}' was updated. From ${visual.translate(v.valueBefore)} to ${visual.translate(v.valueAfter)}`;
visual.object_changed_1 = visual.changed;
visual.object_changed_2 = visual.changed;
visual.object_changed = (v) => visual.ize(v.changedChild);

visual.ize = (difs) => {
  let result = '';
  values2(difs).forEach((v) => {
    if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
    result += visual.genStr(visual[v.dif](v));
  });
  return result.trim();
};

export default visual.ize;
