/* eslint-disable import/extensions, camelcase, no-use-before-define */
import _ from 'lodash';
import { values2 } from './default.js';

const object_created = (v) => ({ CREATE: { [v.pathJoin()]: v.valueAfter } });
const created = object_created;

const object_deleted = (v) => ({ DELETE: { [v.pathJoin()]: v.valueBefore } });
const deleted = object_deleted;

const object_unchanged = (v) => ({ UNCHANGED: { [v.pathJoin()]: v.valueAfter } });
const unchanged = object_unchanged;

const changed = (v) => {
  const subresult = {};
  subresult.prev = v.valueBefore;
  subresult.after = v.valueAfter;
  return { UPDATE: { [v.pathJoin()]: subresult } };
};
const object_changed_1 = changed;
const object_changed_2 = changed;

const object_changed = (v) => visualize(v.changedChild, true);

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

const visualize = (difs, raw = false) => {
  const result = values2(difs).reduce((acc, v) => {
    if (visual[v.dif] === undefined) throw new Error(`buildDif().dif: ${v.dif}; is not supported`);
    return _.merge(acc, visual[v.dif](v));
  }, {});
  if (raw === true) return result;
  return JSON.stringify(result, null, '\t');
};

export default visualize;
