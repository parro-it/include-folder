'use strict';

var expect = require("expect.js");
var include_folder = require("../lib/include-folder");


describe("include_folder", function () {
    it("is defined", function () {
        expect(include_folder).to.be.an('object');
    });
});
