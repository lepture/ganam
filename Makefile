all:
	@npm install -d
	@cp scripts/githooks/* .git/hooks/
	@chmod -R +x .git/hooks/


specs := $(shell find ./tests -name '*.test.js' ! -path "*node_modules/*")
reporter = spec
opts =
test:
	@rm -fr tests/_site
	@node_modules/.bin/mocha --reporter ${reporter} ${opts} ${specs}


jsfiles := $(shell find . -name '*.js' ! -path "*node_modules/*" ! -path "*_themes/*" ! -path "*docs/*" ! -path "*_site/*")
lint:
	@node_modules/.bin/jshint ${jsfiles} --config=scripts/lint.json

out = _site/coverage.html
coverage:
	@scripts/detect-jscoverage.sh
	@rm -fr lib-cov
	@jscoverage lib lib-cov
	@NICO_COVERAGE=1 $(MAKE) test reporter=html-cov > ${out}
	@echo
	@rm -fr lib-cov
	@echo "Built Report to ${out}"
	@echo

documentation:
	@nico build -C nico.json -q

server:
	@nico server -C nico.json -v --watch

publish: clean documentation coverage
	@ghp-import _site -p

clean:
	@rm -fr tests/_site
	@rm -fr _site

.PHONY: all build test lint coverage
