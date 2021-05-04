import _ from 'lodash';

export const typeofEx = (v) => {
  if (v === null) return 'null';
  return typeof v;
}

const buildDif = (obj1, obj2, path = []) => {
  const result = {};

  for (const [k, v] of Object.entries(obj1)) {
    if (!_.has(obj1, k)) return;
    const subresult = {};
    subresult.path = path.slice().concat(k);
    subresult.pathJoin = () => subresult.path.join('.');
    subresult.typeBefore = typeofEx(v);
    subresult.typeAfter = typeofEx(obj2[k]);
    subresult.valueBefore = v;
    subresult.valueAfter = obj2[k];

    if (subresult.typeBefore === 'undefined' && subresult.typeAfter !== 'undefined') {
      if (subresult.typeAfter === 'object') { subresult.dif = 'object_created'; } else { subresult.dif = 'created'; }
    } else if (subresult.typeBefore !== 'undefined' && subresult.typeAfter === 'undefined') {
      if (subresult.typeBefore === 'object') { subresult.dif = 'object_deleted'; } else { subresult.dif = 'deleted'; }
    } else if (_.isEqual(subresult.valueBefore, subresult.valueAfter)) {
      if (subresult.typeAfter === 'object') { subresult.dif = 'object_unchanged'; } else { subresult.dif = 'unchanged'; }
    } else if (subresult.typeBefore === 'object' && subresult.typeAfter === 'object') {
      subresult.dif = 'object_changed';
      subresult
        .changedChild = buildDif(subresult.valueBefore, subresult.valueAfter, subresult.path);
    } else if (subresult.typeBefore === 'object') {
      subresult.dif = 'object_changed_1';
    } else if (subresult.typeAfter === 'object') {
      subresult.dif = 'object_changed_2';
    } else {
      subresult.dif = 'changed';
    }

    result[k] = subresult;
  }

  for (const [k, v] of Object.entries(obj2)) {
    if (_.has(obj2, k) && !_.has(obj1, k)) {
      const subresult = {};
      subresult.path = path.slice().concat(k);
      subresult.pathJoin = () => subresult.path.join('.');
      subresult.typeAfter = typeofEx(v);
      subresult.valueAfter = v;

      if (subresult.typeAfter === 'object') subresult.dif = 'object_created';
      else subresult.dif = 'created';

      result[k] = subresult;
    }
  }

  //console.log(result);
  return result;
};

export default buildDif;
