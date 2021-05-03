import parse from './parser.js';
import formats from './formatters/index.js';
import buildDif from './buildDif.js';

export default (file1, file2, format = 'default') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  // if (format === undefined)
  return formats[format](buildDif(obj1, obj2));
};
