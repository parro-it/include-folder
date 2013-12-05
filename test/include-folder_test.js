'use strict';

var expect = require("expect.js"),
    _ = require("lodash"),
    includeFolder = require("../lib/include-folder");


describe("include_folder", function () {
    it("is defined", function () {
        expect(includeFolder).to.be.an('function');
    });

    it("has test hook", function () {
        expect(includeFolder._testHook).to.be.an('object');
    });

    function moduleCheck(folderModule) {
        it("is an object", function () {
            expect(folderModule).to.be.an('object');
        });


        it("has a property for each file", function () {
            expect(_.keys(folderModule).length).to.be.equal(3);
        });

        it("extension is stripped from file names", function () {
            expect("file1" in folderModule).to.be.equal(true);
        });

        it("duplicated file names properties are incremented", function () {
            expect("file1_1" in folderModule).to.be.equal(true);
        });

        it("properties names are normalized", function () {
            expect("file3OtherFile" in folderModule).to.be.equal(true);
        });

        it("properties values are file content", function () {
            expect(folderModule.file1).to.be.equal("this is file1 content");
        });
    }

    describe ("generated source code",function(){
        var source = includeFolder._testHook.buildSource("./test/files"),
            folderModule = (new Function("require","__dirname",source))(require,__dirname+"/files/");


        moduleCheck(folderModule);
    });

    describe ("returned object",function(){


        moduleCheck(includeFolder("./test/files"));
    });

});
