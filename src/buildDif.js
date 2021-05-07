import _ from 'lodash';

export const typeofEx = (v) => {
  if (v === null) return 'null';
  return typeof v;
};

const cathegorize = (subresult) => {
  if (subresult.typeBefore === 'undefined' && subresult.typeAfter !== 'undefined') {
    if (subresult.typeAfter === 'object') { return 'object_created'; }
    return 'created';
  } if (subresult.typeBefore !== 'undefined' && subresult.typeAfter === 'undefined') {
    if (subresult.typeBefore === 'object') { return 'object_deleted'; }
    return 'deleted';
  } if (_.isEqual(subresult.valueBefore, subresult.valueAfter)) {
    if (subresult.typeAfter === 'object') { return 'object_unchanged'; }
    return 'unchanged';
  } if (subresult.typeBefore === 'object' && subresult.typeAfter === 'object') {
    return 'object_changed';
  } if (subresult.typeBefore === 'object') {
    return 'object_changed_1';
  } if (subresult.typeAfter === 'object') {
    return 'object_changed_2';
  }
  return 'changed';
};

const buildDif = (obj1, obj2, path = []) => {
  const result1 = Object.entries(obj1).reduce((acc, [k, v]) => {
    if (!_.has(obj1, k)) return acc;
    const preresult1 = {
      path: path.slice().concat(k),
      pathJoin: () => preresult1.path.join('.'),
      typeBefore: typeofEx(v),
      typeAfter: typeofEx(obj2[k]),
      valueBefore: v,
      valueAfter: obj2[k],
    };
    const dif = cathegorize(preresult1);
    const preresult2 = {
      ...preresult1,
      dif,
      changedChild: (dif === 'object_changed')
        ? buildDif(preresult1.valueBefore, preresult1.valueAfter, preresult1.path)
        : undefined,
    };
    return {
      ...acc,
      [k]: _.merge(preresult1, preresult2),
    };
  }, {});

  const result2 = Object.entries(obj2).reduce((acc, [k, v]) => {
    if (!_.has(obj2, k) || _.has(obj1, k)) return acc;
    const preresult1 = {
      path: path.slice().concat(k),
      pathJoin: () => preresult1.path.join('.'),
      typeAfter: typeofEx(v),
      valueAfter: v,
      dif: (typeofEx(v) === 'object') ? 'object_created' : 'created',
    };
    return {
      ...acc,
      [k]: preresult1,
    };
  }, {});

  return _.merge(result1, result2);
};

export default buildDif;
