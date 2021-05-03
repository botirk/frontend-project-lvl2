install:
	npm install
	
run:
	bin/index.js -h

test-run-json:
	bin/index.js __fixtures__/dif_before.json __fixtures__/dif_after.json

test-run-yaml:
	bin/index.js __fixtures__/dif_before.yaml __fixtures__/dif_after.yaml

test-run-ini:
	bin/index.js __fixtures__/dif_before.ini __fixtures__/dif_after.ini

test-run-nested-json:
	bin/index.js __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json

test-run-plain:
	bin/index.js --format plain __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json

test-run-format-json:
	bin/index.js --format json __fixtures__/nested_dif_before.json __fixtures__/nested_dif_after.json
	
lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

chmod:
	sudo chmod -R 775 .