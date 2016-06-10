'use strict';

var fs = require('fs');
var path = require('path');
var micromatch = require('micromatch');

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
  var self = this;
  var files = fs.readdirSync(folderName);
  var allProps = {};

  options = options || {};
  options.basePath = options.basePath || folderName;

  if (filter && typeof filter !== 'function') {
    if (filter.test) {
      filter = filter.test.bind(filter);
    } else {
      var globs = typeof filter === 'string' ? [filter] : filter;
      if (globs.filter(function (glob) {
        return /(\/|\*\*)/.test(glob);
      }).length > 0) {
        // a glob that includes subfolders was used, enable recursion
        options.recurse = true;
      }
      filter = function (name) {
        return micromatch([name], globs).length > 0;
      };
    }
  }

  var fields = files.map(function (fileName) {
    var fullname = path.join(folderName, fileName);
    var relative = path.relative(options.basePath, fullname);

    if (fs.lstatSync(fullname).isDirectory()) {
      if (!options.recurse) {
        return;
      }
      var folderSource = self.buildSource(fullname, filter, options);
      if (!/readFileSync/.test(folderSource)) {
        // folder is empty
        return;
      }
      return 'self["' + fileName + '"] = (function(){' +
         folderSource +
        '})();';
    }

    if (filter && !filter(relative)) {
      return;
    }

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
  }).filter(function (source) {
    // remove filtered entries
    return !!source;
  });

  /*
  */
  return 'var self={},' +
    'fs = require("fs");\n' +
    fields.join('\n') +
    '\nreturn self';
};

module.exports = includeFolder;
