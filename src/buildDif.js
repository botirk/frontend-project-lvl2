/* eslint-disable no-use-before-define, no-nested-ternary */
import _ from 'lodash';

export const typeofEx = (v) => {
  if (v === null) return 'null';
  return typeof v;
};

const objectPrefix = (typeBefore, typeAfter) => (
  (typeBefore === 'object' || typeAfter === 'object') ? 'object_' : ''
);

const createdDeletedPostfix = (typeBefore, typeAfter) => (
  (typeBefore === 'undefined' && typeAfter !== 'undefined') ? 'created'
    : (typeBefore !== 'undefined' && typeAfter === 'undefined') ? 'deleted'
      : undefined
);

const unchangedPostfix = (valueBefore, valueAfter) => (
  (_.isEqual(valueBefore, valueAfter)) ? 'unchanged' : undefined
);

const changedPostfix = (typeBefore, typeAfter) => (
  (typeBefore === 'object' && typeAfter !== 'object') ? 'changed_1'
    : (typeAfter === 'object' && typeBefore !== 'object') ? 'changed_2'
      : 'changed'
);

const categorize = (valueBefore, typeBefore, valueAfter, typeAfter) => {
  const prefix = objectPrefix(typeBefore, typeAfter);
  const postfix = createdDeletedPostfix(typeBefore, typeAfter)
    ?? unchangedPostfix(valueBefore, valueAfter)
    ?? changedPostfix(typeBefore, typeAfter);

  return `${prefix}${postfix}`;
};

const buildDifObj1 = (obj2, globalPath) => (acc, [k, v]) => {
  const valueBefore = v;
  const valueAfter = obj2[k];

  const typeBefore = typeofEx(valueBefore);
  const typeAfter = typeofEx(valueAfter);

  const path = globalPath.concat(k);
  const pathJoined = path.join('.');

  const dif = categorize(valueBefore, typeBefore, valueAfter, typeAfter);
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
  // key only exists in obj2
  const valueAfter = v;
  const typeAfter = typeofEx(valueAfter);
  const path = globalPath.concat(k);
  const pathJoined = path.join('.');
  const dif = (typeAfter === 'object') ? 'object_created' : 'created';

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
