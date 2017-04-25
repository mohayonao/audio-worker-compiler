# AudioWorkerCompiler
[![Build Status](http://img.shields.io/travis/mohayonao/audio-worker-compiler.svg?style=flat-square)](https://travis-ci.org/mohayonao/audio-worker-compiler)
[![NPM Version](http://img.shields.io/npm/v/audio-worker-compiler.svg?style=flat-square)](https://www.npmjs.org/package/audio-worker-compiler)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
$ npm install audio-worker-compiler
```

## Command Line

You may also use this from the command line:

```bash
audio-worker-compiler bitcrusher.js > bitcrusher-compiled.js
```

## API
### AudioWorkerCompiler
- `compile(code: string): string`

## Example

```js
onaudioprocess = function(e) {
  e.outputs[0][0].set(e.inputs[0][0]);
};
```

compiled

```js
self.onaudioprocess = function(e) {
  e.outputs[0][0].set(e.inputs[0][0]);
};
```

## License

MIT
