.PHONY: clean build test release

build: 
	npm install --production --no-bin-links
	rm -r node_modules/aws-sdk
	zip -r package.zip "node_modules" "index.js"
