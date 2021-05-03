import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (file) => {
  const ext = path.extname(file);
  const str = fs.readFileSync(file, 'utf-8');

  switch (ext) {
    case '.json':
      return JSON.parse(str);
    case '.yaml':
      return yaml.load(str, { schema: yaml.JSON_SCHEMA, json: true });
    case '.ini':
      return { ...ini.parse(str) };
    default:
      throw new Error(`parser does not support ${ext}`);
  }
};
