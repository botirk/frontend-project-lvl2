// visualize default
const visual = {};
visual.tab = '   ';
visual.genStr = (tabLevel, str) => {
  const result = visual.tab.repeat(tabLevel) + ' ' + str;
  if (result[result.length - 1] === '\n') return result;
  return `${result}\n`;
};
visual.genStart = (tabLevel = 0) => visual.genStr(tabLevel, '{');
visual.genFinish = (tabLevel) => visual.genStr(tabLevel, '}');
// required rewrite
JSON.stringify2 = (tabLevel, obj) => {
  let result = visual.genStart();
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) // todo
    { result += JSON.stringify2(tabLevel + 1, v); } else result += visual.genStr(tabLevel + 1, `${k}: ${v}`);
  }
  return result + visual.genFinish(tabLevel);
};

visual.object_sign = (tabLevel, k, v, sign) => {
  const vRE = (sign === '+') ? v.valueAfter : v.valueBefore;
  return visual.genStr(tabLevel, ` ${sign} ${k}: ${JSON.stringify2(tabLevel + 1, vRE)}`);
};

visual.object_created = (tabLevel, k, v) => visual.object_sign(tabLevel, k, v, '+');
visual.created = (tabLevel, k, v) => visual.genStr(tabLevel, ` + ${k}: ${v.valueAfter}`);

visual.object_deleted = (tabLevel, k, v) => visual.object_sign(tabLevel, k, v, '-');
visual.deleted = (tabLevel, k, v) => visual.genStr(tabLevel, ` - ${k}: ${v.valueBefore}`);

visual.object_unchanged = (tabLevel, k, v) => visual.genStr(tabLevel + 1, `${k}: ${JSON.stringify2(tabLevel + 1, v.valueAfter)}`);
visual.unchanged = (tabLevel, k, v) => visual.genStr(tabLevel, `   ${k}: ${v.valueAfter}`);

visual.object_changed = (tabLevel, k, v) => visual.genStr(tabLevel + 1, `${k}: ${visual.ize(v.changedChild, tabLevel + 1)}`);
visual.object_changed_1 = (tabLevel, k, v) => visual.object_deleted(tabLevel, k, v) + visual.created(tabLevel, k, v);
visual.object_changed_2 = (tabLevel, k, v) => visual.deleted(tabLevel, k, v) + visual.object_created(tabLevel, k, v);
visual.changed = (tabLevel, k, v) => visual.deleted(tabLevel, k, v) + visual.created(tabLevel, k, v);

visual.ize = (difs, tabLevel = 0) => {
  let result = visual.genStart();
  for (const [k, v] of Object.entries(difs)) {
    if (visual[v.dif] === undefined) throw new Error(`buildDif().dif: ${v.dif}; is not supported`);
    result += visual[v.dif](tabLevel, k, v);
  }
  return result + visual.genFinish(tabLevel);
};

export default visual.ize;
