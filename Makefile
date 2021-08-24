install:
	npm install
	
run:
	bin/index.js -h

run-json:
	bin/index.js __fixtures__/json/dif_before.json __fixtures__/json/dif_after.json

run-yaml:
	bin/index.js __fixtures__/yaml/dif_before.yaml __fixtures__/yaml/dif_after.yaml

run-ini:
	bin/index.js __fixtures__/ini/dif_before.ini __fixtures__/ini/dif_after.ini

run-nested-json:
	bin/index.js __fixtures__/json/nested_dif_before.json __fixtures__/json/nested_dif_after.json

run-plain:
	bin/index.js --format plain __fixtures__/json/nested_dif_before.json __fixtures__/json/nested_dif_after.json

run-format-json:
	bin/index.js --format json __fixtures__/json/nested_dif_before.json __fixtures__/json/nested_dif_after.json

run-hexlet:
	bin/index.js __fixtures__/hexlet/file1.json __fixtures__/hexlet/file2.json

run-hexlet-plain:
	bin/index.js --format plain __fixtures__/hexlet/file1.json __fixtures__/hexlet/file2.json
	
lint:
	npx eslint .

lint+fix:
	npx eslint . --fix

test:
	npm test

publish:
	npm publish --dry-run

chmod:
	sudo chmod -R 775 .