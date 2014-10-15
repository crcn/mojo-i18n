REPORTER=dot
ONLY="."


test-watch:
	mocha --recursive --ignore-leaks --reporter $(REPORTER) -b -g $(ONLY) --timeout 10000 --watch ./test ./lib

