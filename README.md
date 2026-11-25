# Methods

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]

HTTP verbs that Node.js core's HTTP parser supports.

This package exports a lowercased copy of Node.js's `http.METHODS`. Browser bundles use a snapshot of the methods supported by Node.js 0.10 and need no HTTP shim.

## Install

```sh
npm install methods
```

## API

```js
import { methods } from "methods";
```

## License

[MIT](LICENSE)

[ci-image]: https://img.shields.io/github/actions/workflow/status/jshttp/methods/ci.yml?branch=master
[ci-url]: https://github.com/jshttp/methods/actions/workflows/ci.yml
[coverage-image]: https://img.shields.io/codecov/c/gh/jshttp/methods
[coverage-url]: https://codecov.io/gh/jshttp/methods
[node-image]: https://img.shields.io/node/v/methods
[node-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://img.shields.io/npm/dm/methods
[npm-url]: https://npmjs.org/package/methods
[npm-version-image]: https://img.shields.io/npm/v/methods
