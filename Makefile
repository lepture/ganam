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
	@rm -fr lib-cov
	@jscoverage lib lib-cov
	@COVERAGE=1 $(MAKE) test reporter=html-cov > ${out}
	@echo
	@rm -fr lib-cov
	@echo "Built Report to ${out}"
	@echo

coveralls:
	@node_modules/.bin/jscoverage lib lib-cov
	@COVERAGE=1 $(MAKE) test reporter=mocha-lcov-repoter | node_modules/.bin/coveralls
	@rm -fr lib-cov

theme = $(HOME)/.spm/themes/one
documentation:
	@cp README.md docs/index.md
	@nico build -C nico.json -q --theme=${theme}

server:
	@cp README.md docs/index.md
	@nico server -C nico.json -v --watch --theme=${theme}

publish: clean documentation coverage
	@ghp-import _site -p

clean:
	@rm -fr _site

.PHONY: all build test lint coverage
