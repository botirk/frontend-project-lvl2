/* eslint-disable no-use-before-define */
import _ from 'lodash';

export const typeofEx = (v) => {
  if (v === null) return 'null';
  return typeof v;
};

const cathegorize = (valueBefore, typeBefore, valueAfter, typeAfter) => {
  if (typeBefore === 'undefined' && typeAfter !== 'undefined') {
    if (typeAfter === 'object') { return 'object_created'; }
    return 'created';
  } if (typeBefore !== 'undefined' && typeAfter === 'undefined') {
    if (typeBefore === 'object') { return 'object_deleted'; }
    return 'deleted';
  } if (_.isEqual(valueBefore, valueAfter)) {
    if (typeAfter === 'object') { return 'object_unchanged'; }
    return 'unchanged';
  } if (typeBefore === 'object' && typeAfter === 'object') {
    return 'object_changed';
  } if (typeBefore === 'object') {
    return 'object_changed_1';
  } if (typeAfter === 'object') {
    return 'object_changed_2';
  }
  return 'changed';
};

const buildDifObj1 = (obj2, globalPath) => (acc, [k, v]) => {
  const valueBefore = v;
  const valueAfter = obj2[k];

  const typeBefore = typeofEx(valueBefore);
  const typeAfter = typeofEx(valueAfter);

  const path = globalPath.concat(k);
  const pathJoined = path.join('.');

  const dif = cathegorize(valueBefore, typeBefore, valueAfter, typeAfter);
  const childDif = (dif === 'object_changed')
    ? buildDif(valueBefore, valueAfter, path) : undefined;

  return {
    ...acc,
    [k]: {
      valueBefore,
      valueAfter,
      typeBefore,
      typeAfter,
      path,
      pathJoined,
      dif,
      childDif,
    },
  };
};

const buildDifObj2 = (obj1, globalPath) => (acc, [k, v]) => {
  // key exists in obj1 = there is no reason to build it again for obj2
  if (_.has(obj1, k)) return acc;

  const valueAfter = v;
  const typeAfter = typeofEx(valueAfter);
  const path = globalPath.concat(k);
  const pathJoined = path.join('.');
  const dif = (typeofEx(v) === 'object') ? 'object_created' : 'created';

  return {
    ...acc,
    [k]: {
      valueAfter, typeAfter, path, pathJoined, dif,
    },
  };
};

const buildDif = (obj1, obj2, globalPath = []) => {
  const result1 = Object.entries(obj1).reduce(buildDifObj1(obj2, globalPath), {});

  const result2 = Object.entries(obj2).reduce(buildDifObj2(obj1, globalPath), {});

  return _.merge(result1, result2);
};

export default buildDif;
