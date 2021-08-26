/* eslint-disable no-use-before-define */
import { typeofEx } from '../buildDif';
import { valuesSorted, endStr } from './default';

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
  object_created: (dif) => (
    `Property '${dif.pathJoined}' was added with value: ${translate(dif.valueAfter)}`
  ),
  created: (dif) => dispatcher.object_created(dif),
  object_deleted: (dif) => (
    `Property '${dif.pathJoined}' was removed`
  ),
  deleted: (dif) => dispatcher.object_deleted(dif),
  object_unchanged: () => '',
  unchanged: () => '',
  changed: (dif) => (
    `Property '${dif.pathJoined}' was updated. `
    + `From ${translate(dif.valueBefore)} to ${translate(dif.valueAfter)}`
  ),
  object_changed_1: (dif) => dispatcher.changed(dif),
  object_changed_2: (dif) => dispatcher.changed(dif),
  object_changed: (dif) => dispatcherize(dif.childDif),
};

const dispatcherize = (difs) => valuesSorted(difs).reduce((acc, dif) => {
  if (dispatcher[dif.dif] === undefined) throw new Error(`buildDif().dif: ${dif.dif}; is not supported`);
  return acc + endStr(dispatcher[dif.dif](dif));
}, '').trim();

export default dispatcherize;
