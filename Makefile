install:
	npm ci

test:
	npm test --test-reporter=spec

test-coverage:
	npm test

lint:
	npx eslint .

publish:
	npm publish --dry-run

