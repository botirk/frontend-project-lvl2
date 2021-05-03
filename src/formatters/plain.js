const visual = {};
visual.genStr = (str) => {
  if (str[str.length - 1] === '\n' || str.length === 0) return str;
  return `${str}\n`;
};
visual.translate = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

visual.object_created = visual.created = (v) => `Property '${v.pathJoin()}' was added with value: ${visual.translate(v.valueAfter)}`;
visual.object_deleted = visual.deleted = (v) => `Property '${v.pathJoin()}' was removed`;
visual.object_unchanged = visual.unchanged = () => '';
visual.changed = visual.object_changed_1 = visual.object_changed_2 = (v) => `Property '${v.pathJoin()}' was updated. From ${visual.translate(v.valueBefore)} to ${visual.translate(v.valueAfter)}`;
visual.object_changed = (v) => visual.ize(v.changedChild);

visual.ize = (difs) => {
  let result = '';
  for (const [k, v] of Object.entries(difs)) {
    if (visual[v.dif] === undefined) { throw new Error(`buildDif().dif: ${v.dif}; is not supported`); }
    result += visual.genStr(visual[v.dif](v));
  }
  return result;
};

export default visual.ize;
