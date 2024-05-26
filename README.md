### Difference calculator
Calculates and display differences in config files \
Available file formats: .json .yaml .yml .ini \
Available difference results: default stylish plain json

## Command examples
+ bin/index.js \_\_fixtures\_\_/dif_before.json \_\_fixtures\_\_/dif_after.json
+ bin/index.js \_\_fixtures\_\_/yaml/dif_before.yaml \_\_fixtures\_\_/yaml/dif_after.yaml
+ bin/index.js \_\_fixtures\_\_/ini/dif_before.ini \_\_fixtures\_\_/ini/dif_after.ini
+ bin/index.js \_\_fixtures\_\_/json/nested_dif_before.json \_\_fixtures__/json/nested_dif_after.json
+ bin/index.js --format plain \__fixtures__/json/nested_dif_before.json \_\_fixtures__/json/nested_dif_after.json
+ bin/index.js --format json \__fixtures__/json/nested_dif_before.json \_\_fixtures__/json/nested_dif_after.json
+ bin/index.js \_\_fixtures__/hexlet/file1.json \_\_fixtures__/hexlet/file2.json
+ bin/index.js --format plain \_\_fixtures__/hexlet/file1.json \_\_fixtures__/hexlet/file2.json

## Output examples
```
bin/index.js __fixtures__/dif_before.json __fixtures__/dif_after.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/botirk/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/botirk/frontend-project-lvl2/actions)
### Codeclimate code quality:
[![Maintainability](https://api.codeclimate.com/v1/badges/7ac0f7fcbdf5ab7da43e/maintainability)](https://codeclimate.com/github/botirk/frontend-project-lvl2/maintainability)
### Github Actions: Eslint
[![Node.js linter](https://github.com/botirk/frontend-project-lvl2/actions/workflows/node.js%20lint.yml/badge.svg)](https://github.com/botirk/frontend-project-lvl2/actions/workflows/node.js%20lint.yml)
### Github Actions: Jest
[![Node.js tests](https://github.com/botirk/frontend-project-lvl2/actions/workflows/node.js%20tests.yml/badge.svg)](https://github.com/botirk/frontend-project-lvl2/actions/workflows/node.js%20tests.yml)

### Usage example: plain .JSON
[![asciicast](https://asciinema.org/a/wajqfwq4vxZ7sZaEW8ZjnY4wA.svg)](https://asciinema.org/a/wajqfwq4vxZ7sZaEW8ZjnY4wA)
### Usage example: plain .YAML
[![asciicast](https://asciinema.org/a/DYFvo5VPhp0kIu1wR8iLPDUqI.svg)](https://asciinema.org/a/DYFvo5VPhp0kIu1wR8iLPDUqI)
### Usage example: nested .JSON
[![asciicast](https://asciinema.org/a/oFsLap8Nw6hONzT48udgPh5lt.svg)](https://asciinema.org/a/oFsLap8Nw6hONzT48udgPh5lt)
### Usage example: nested .JSON --format plain
[![asciicast](https://asciinema.org/a/KqO4enyn5vI7J1T1YMUi5cexN.svg)](https://asciinema.org/a/KqO4enyn5vI7J1T1YMUi5cexN)
### Usage example: nested .JSON --format json
[![asciicast](https://asciinema.org/a/gR0LVXj4fiqMyHRKJrkq8n7yW.svg)](https://asciinema.org/a/gR0LVXj4fiqMyHRKJrkq8n7yW)
