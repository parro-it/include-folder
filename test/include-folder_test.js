'use strict';

var expect = require("expect.js"),
    _ = require("lodash"),
    includeFolder = require("../lib/include-folder");


describe("normalize", function() {
    it("handles .DS_Store",function() {
           var normalized = includeFolder._testHook.normalize(".DS_Store");
            expect(normalized).to.be.equal("DS_Store");        
    });
});

describe("stripExtension", function() {
    it("remove extension",function() {
           var normalized = includeFolder._testHook.stripExtension("test.txt");
            expect(normalized).to.be.equal("test");        
    });

    it("handles hidden files",function() {
           var normalized = includeFolder._testHook.stripExtension(".txt");
            expect(normalized).to.be.equal("txt");        
    });
});



describe("include_folder", function() {
    it("is defined", function() {
        expect(includeFolder).to.be.an('function');
    });

    it("has test hook", function() {
        expect(includeFolder._testHook).to.be.an('object');
    });

    function moduleCheck(folderModule) {
        it("is an object", function() {
            expect(folderModule).to.be.an('object');
        });


        it("has a property for each file", function() {
            expect(_.keys(folderModule).length).to.be.equal(4);
        });

        it("extension is stripped from file names", function() {
            expect("file1" in folderModule).to.be.equal(true);
        });

        it("duplicated file names properties are incremented", function() {
            expect("file1_1" in folderModule).to.be.equal(true);
        });

        it("properties names are normalized", function() {
            expect("file3OtherFile" in folderModule).to.be.equal(true);
        });

        it("properties values are file content", function() {
            expect(folderModule.file1).to.be.equal("this is file1 content");
        });
    }

    describe("generated source code", function() {
        var source,
            folderModule;

        source = includeFolder._testHook.buildSource("./test/files"),
        console.log(source)
        folderModule = (new Function("require", "__dirname", source))(require, __dirname + "/files/");

        moduleCheck(folderModule);
    });


    describe("returned object", function() {


        var folderModule = includeFolder("./test/files");

        moduleCheck(folderModule);
    });

});
