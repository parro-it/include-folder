/*
 * include-folder
 * https://github.com/parroit/include-folder
 *
 * Copyright (c) 2013 parroit
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash"),
    fs = require("fs");

function includeFolder(folderName) {
    if (folderName.charAt(folderName.length - 1) === "/") {
        folderName = folderName.substring(0,folderName.length-1);
    }
    var source = includeFolder._testHook.buildSource(folderName);

    return (new Function("require", "__dirname", source))(require, folderName);

}


function normalize(name) {
    var chars = [];
    var nextUpper = false;
    var i = 0,
        l = name.length;

    for (; i < l; i++) {
        var c = name.charAt(i);
        if (/\w/.test(c)) {
            chars.push(nextUpper ? c.toUpperCase() : c);
            nextUpper = false;
        } else {
            nextUpper = true;
        }
    }
    name = chars.join("");
    return name;
}

function stripExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, "");
}

function buildSource(folderName) {
    var files = fs.readdirSync(folderName);
    var allProps = {};
    var fields = _.map(files, function (fileName) {
        var name = normalize(stripExtension(fileName));

        if (name in allProps) {
            allProps[name]++;
            name += "_" + allProps[name];
        } else {
            allProps[name] = 0;
        }

        return 'self.' + name + ' = fs.readFileSync(__dirname + "/' + fileName + '","utf8");';
    });


    return "var self={}," +
        "fs = require('fs');\n" +
        fields.join("\n") +
        "\nreturn self";
}


includeFolder._testHook = {
    buildSource: buildSource
};


module.exports = includeFolder;
