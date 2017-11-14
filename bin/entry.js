/**
 *
 *  entry.js
 *
 *  command-line entry script for bin sub-folders
 *
 *  @arg script foldername to require
 */
require('babel-register');
require('babel-polyfill');

const script = process.argv[2];

if (!script) {
  throw Error('Please provide an argument to bin/entry.js');
  process.exit();
}

require(`./${script}`);
