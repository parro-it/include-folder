'use strict';

var includeFolder = require('..');

var folder = includeFolder(__dirname + '/files');

console.log(folder.file1,folder.file2);