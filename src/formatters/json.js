/* eslint-disable import/extensions, camelcase, no-use-before-define */
import _ from 'lodash';
import { valuesSorted } from './default.js';

const dispatcher = {
  created: (dif) => ({ CREATE: { [dif.pathJoined]: dif.valueAfter } }),
  object_created: (div) => dispatcher.created(div),
  deleted: (dif) => ({ DELETE: { [dif.pathJoined]: dif.valueBefore } }),
  object_deleted: (dif) => dispatcher.deleted(dif),
  unchanged: (dif) => ({ UNCHANGED: { [dif.pathJoined]: dif.valueAfter } }),
  object_unchanged: (dif) => dispatcher.unchanged(dif),
  changed: (dif) => ({
    UPDATE: {
      [dif.pathJoined]: {
        prev: dif.valueBefore,
        after: dif.valueAfter,
      },
    },
  }),
  object_changed_1: (dif) => dispatcher.changed(dif),
  object_changed_2: (dif) => dispatcher.changed(dif),
  object_changed: (dif) => dispatcherize(dif.childDif, true),
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
