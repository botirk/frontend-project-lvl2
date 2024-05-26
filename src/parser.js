import yaml from 'js-yaml';
import ini from 'ini';

export default (str, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(str);
    case '.yml':
    case '.yaml':
      return yaml.load(str, { schema: yaml.JSON_SCHEMA, json: true });
    case '.ini':
      return { ...ini.parse(str) };
    default:
      throw new Error(`parser does not support ${ext}`);
  }
};
