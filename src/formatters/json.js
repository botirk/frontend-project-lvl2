/* eslint-disable import/extensions */
import _ from 'lodash';
import { values2 } from './default.js';

const visual = {};

visual.object_created = (v) => ({ CREATE: { [v.pathJoin()]: v.valueAfter } });
visual.created = visual.object_created;

visual.object_deleted = (v) => ({ DELETE: { [v.pathJoin()]: v.valueBefore } });
visual.deleted = visual.object_deleted;

visual.object_unchanged = (v) => ({ UNCHANGED: { [v.pathJoin()]: v.valueAfter } });
visual.unchanged = visual.object_unchanged;

visual.changed = (v) => {
  const subresult = {};
  subresult.prev = v.valueBefore;
  subresult.after = v.valueAfter;
  return { UPDATE: { [v.pathJoin()]: subresult } };
};
visual.object_changed_1 = visual.changed;
visual.object_changed_2 = visual.changed;

visual.object_changed = (v) => visual.ize(v.changedChild, true);

visual.ize = (difs, raw = false) => {
  let result = {};
  values2(difs).forEach((v) => {
    if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
    result = _.merge(result, visual[v.dif](v));
  });
  if (raw === true) return result;
  return JSON.stringify(result, null, '\t');
};

export default visual.ize;
