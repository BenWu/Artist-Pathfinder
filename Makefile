install:
	npm install
	pip install -Ur requirements.txt
	python setup.py develop

build:
	npm run build

watch:
	npm run watch

start:
	npm run start
