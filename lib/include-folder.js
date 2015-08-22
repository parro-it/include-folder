'use strict';

var fs = require('fs');

function includeFolder (folderName, filter, options) {
  folderName = folderName.replace(/\/$/, '');

  if (!filter) {
    filter = /^[^.].*$/;
  }

  if (typeof options !== 'object') {
    options = {};
  }

  var source = includeFolder.buildSource(folderName, filter, options);
  return (new Function('require', '__dirname', source))(require, folderName); // eslint-disable-line no-new-func
}

includeFolder.normalize = function (name) {
  var chars = [];
  var nextUpper = false;
  var i = 0;
  var l = name.length;

  for (; i < l; i++) {
    var c = name.charAt(i);
    if (/\w/.test(c)) {
      chars.push(nextUpper ? c.toUpperCase() : c);
      nextUpper = false;
    } else {
      nextUpper = true;
    }
  }
  name = chars.join('');
  return name;
};

includeFolder.stripExtension = function (fileName) {
  return fileName.replace(/^\./, '').replace(/\.[^/.]+$/, '');
};

includeFolder.buildSource = function (folderName, filter, options) {
  var files = fs.readdirSync(folderName);
  var allProps = {};
  filter = filter.test.bind(filter);
  var fields = files.filter(filter).map(function (fileName) {
    var name = includeFolder.normalize(
      includeFolder.stripExtension(fileName, options),
      options
    );

    if (options && options.preserveFilenames === true) {
      name = fileName;
    }

    if (name in allProps) {
      allProps[name]++;
      name += '_' + allProps[name];
    } else {
      allProps[name] = 0;
    }

    return 'self["' + name + '"] = fs.readFileSync("' + folderName + '/' + fileName + '","utf8");';
  });

  return 'var self={},' +
    'fs = require("fs");\n' +
    fields.join('\n') +
    '\nreturn self';
};

module.exports = includeFolder;
