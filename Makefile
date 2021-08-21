install:
	npm install
	
run:
	bin/index.js -h

run-json:
	bin/index.js __fixtures__/dif_before.json __fixtures__/dif_after.json

run-yaml:
	bin/index.js __fixtures__/dif_before.yaml __fixtures__/dif_after.yaml

run-ini:
	bin/index.js __fixtures__/dif_before.ini __fixtures__/dif_after.ini

run-nested-json:
	bin/index.js __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json

run-plain:
	bin/index.js --format plain __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json

run-format-json:
	bin/index.js --format json __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json

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