link:
	npm link

install:
	npm install

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

serve:
	npx webpack serve