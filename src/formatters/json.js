/* eslint-disable import/extensions, camelcase, no-use-before-define */
import _ from 'lodash';
import { valuesSorted } from './default.js';

const dispatcher = {
  created: (v) => ({ CREATE: { [v.pathJoin()]: v.valueAfter } }),
  object_created: (v) => dispatcher.created(v),
  deleted: (v) => ({ DELETE: { [v.pathJoin()]: v.valueBefore } }),
  object_deleted: (v) => dispatcher.deleted(v),
  unchanged: (v) => ({ UNCHANGED: { [v.pathJoin()]: v.valueAfter } }),
  object_unchanged: (v) => dispatcher.unchanged(v),
  changed: (v) => ({
    UPDATE: {
      [v.pathJoin()]: {
        prev: v.valueBefore,
        after: v.valueAfter,
      },
    },
  }),
  object_changed_1: (v) => dispatcher.changed(v),
  object_changed_2: (v) => dispatcher.changed(v),
  object_changed: (v) => dispatcherize(v.changedChild, true),
};

const dispatcherize = (difs, raw = false) => {
  const result = valuesSorted(difs).reduce((acc, v) => {
    if (dispatcher[v.dif] === undefined) throw new Error(`buildDif().dif: ${v.dif}; is not supported`);
    return _.merge(acc, dispatcher[v.dif](v));
  }, {});
  if (raw === true) return result;
  return JSON.stringify(result, null, '\t');
};

export default dispatcherize;
