install:
	npm install
	
run:
	bin/index.js -h
	
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