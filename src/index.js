/* eslint-disable import/extensions */
import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import formats from './formatters/index.js';
import buildDif from './buildDif.js';

export default (file1, file2, format = 'default') => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);

  const str1 = fs.readFileSync(file1, 'utf-8');
  const str2 = fs.readFileSync(file2, 'utf-8');

  const obj1 = parse(str1, ext1);
  const obj2 = parse(str2, ext2);

  return formats[format](buildDif(obj1, obj2));
};
