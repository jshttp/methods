# Methods

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][coveralls-image]][coveralls-url]

HTTP verbs that Node.js core's HTTP parser supports.

This module provides an export that is just like `http.METHODS` from Node.js core,
with the following differences:

  * All method names are lower-cased.
  * Contains a fallback list of methods for Node.js versions that do not have a
    `http.METHODS` export (0.10 and lower).
  * Provides the fallback list when using tools like `browserify` without pulling
    in the `http` shim module.

> [!NOTE]
> If you only have to support modern versions of Node.js, it is highly recommended to use the built-in [`http.METHODS`](https://nodejs.org/api/http.html#httpmethods) module from Node.js core instead of this module.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install methods
```

## API

```js
var methods = require('methods')
```

### methods

This is an array of lower-cased method names that Node.js supports. If Node.js
provides the `http.METHODS` export, then this is the same array lower-cased,
otherwise it is a snapshot of the verbs from Node.js 0.10.

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/jshttp/methods/master?label=ci
[ci-url]: https://github.com/jshttp/methods/actions/workflows/ci.yml
[coveralls-image]: https://badgen.net/coveralls/c/github/jshttp/methods/master
[coveralls-url]: https://coveralls.io/r/jshttp/methods?branch=master
[node-image]: https://badgen.net/npm/node/methods
[node-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/methods
[npm-url]: https://npmjs.org/package/methods
[npm-version-image]: https://badgen.net/npm/v/methods
