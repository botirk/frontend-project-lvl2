import _ from 'lodash';

const visual = {};

visual.object_created = visual.created = (v, result) => result.CREATE[v.pathJoin()] = v.valueAfter;

visual.object_deleted = visual.deleted = (v, result) => result.DELETE[v.pathJoin()] = v.valueBefore;

visual.object_unchanged = visual.unchanged = (v, result) => result.UNCHANGED[v.pathJoin()] = v.valueAfter;

visual.changed = visual.object_changed_1 = visual.object_changed_2 = (v, result) => {
  const subresult = {};
  subresult.prev = v.valueBefore;
  subresult.after = v.valueAfter;
  result.UPDATE[v.pathJoin()] = subresult;
};

visual.object_changed = (v, result) => _.merge(result, visual.ize(v.changedChild, true));

visual.ize = (difs, raw = false) => {
  const result = {
    CREATE: {},
    UNCHANGED: {},
    UPDATE: {},
    DELETE: {},
  };
  for (const [k, v] of Object.entries(difs)) {
    if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
    visual[v.dif](v, result);
  }
  if (raw === true) return result;
  return JSON.stringify(result, null, '\t');
};

export default visual.ize;
