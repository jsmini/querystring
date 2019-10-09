# [querystring](https://github.com/jsmini/querystring) 
[![](https://img.shields.io/badge/Powered%20by-jslib%20querystring-brightgreen.svg)](https://github.com/yanhaijing/jslib-querystring)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jsmini/querystring/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jsmini/querystring.svg?branch=master)](https://travis-ci.org/jsmini/querystring)
[![Coveralls](https://img.shields.io/coveralls/jsmini/querystring.svg)](https://coveralls.io/github/jsmini/querystring)
[![npm](https://img.shields.io/badge/npm-0.6.2-orange.svg)](https://www.npmjs.com/package/@jsmini/querystring)
[![NPM downloads](http://img.shields.io/npm/dm/@jsmini/querystring.svg?style=flat-square)](http://www.npmtrends.com/@jsmini/querystring)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jsmini/querystring.svg)](http://isitmaintained.com/project/jsmini/querystring "Percentage of issues still open")

Parse and stringify URL query strings

url 参数处理库

English | [简体中文](./README-zh_CN.md)

## Environment Support

unit test ensure it supports the following environments.

| IE/Edge | Chrome | Firefox | Safari | Opera | IOS  | Android | Node  |
| ------- | ------ | ------- | ------ | ----- | ---- | ------- | ----- |
| 6+      | 23+    | 4+      | 6+     | 10+   | 5+   | 2.3+    | 0.10+ |

## Directory

```
.
├── demo
├── dist  # production code
├── doc   # document
├── src   # source code
├── test  # unit test
├── CHANGELOG.md
└── TODO.md
```

## Usage
npm installation

```bash
$ npm install --save @jsmini/querystring
```

Node.js

```js
var name = require('@jsmini/querystring').name;
```

webpack

```js
import { name } from '@jsmini/querystring';
```

Require.js

```js
requirejs(['node_modules/@jsmini/querystring/dist/index.aio.js'], function (jsmini_querystring) {
    var name = jsmini_querystring.name;
})
```

Browser

```html
<script src="node_modules/@jsmini/querystring/dist/index.aio.js"></script>

<script>
    var name = jsmini_querystring.name;
</script>
```

## Document

- [API](https://github.com/jsmini/querystring/blob/master/doc/api.md)

## Contributing Guide  ![PRs welcome](<https://img.shields.io/badge/PRs-welcome-brightgreen.svg>)
when initialize, install dependencies 

```bash
$ npm install
```

builds your code for production to `build` folder

```bash
$ npm run build
```

run unit test.  notice: borwser enviroment need to test manually.  test file is in `test/browser`

```bash
$ npm test
```

change  the  version in package.json and README.md, add your description in CHANGELOG.md, and then release it happily.

```bash
$ npm run release
```

publish the new package to npm

```bash
$ npm publish --access=public
```

rename  project. you need to edit project name when initialize project or anytime you want to rename the project . you need to rename `formName` and `toname` in file `rename.js`,which will automatically rename project name in the following files

- README.md
- package.json
- config/rollup.js
- test/browser/index.html

```bash
$ npm run rename # rename command
```

## Contributors
[contributors](https://github.com/jsmini/querystring/graphs/contributors)

## CHANGELOG
[CHANGELOG.md](https://github.com/jsmini/querystring/blob/master/CHANGELOG.md)

## TODO
[TODO.md](https://github.com/jsmini/querystring/blob/master/TODO.md)

## who is using

- [url](https://github.com/jsmini/url)