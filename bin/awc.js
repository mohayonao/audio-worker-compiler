#!/usr/bin/env node

'use strict'

var compile = require('../').compile;
var fs      = require('fs');
var path    = require('path');
var resolve = require('path').resolve;


function usage() {
  console.log('\nusage: audio-worker-compiler <input file>\n');
}

if(process.argv.length < 3) {
  usage();
  process.exit(1);
}

var compileSrc = path.resolve(process.argv[2]);

if(!fs.existsSync(compileSrc)) {
  console.error('\nfile does not exist:', compileSrc);
  usage();
  process.exit(1);
}

var src = fs.readFileSync(compileSrc)
console.log(compile(src))
