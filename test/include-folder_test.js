'use strict';

var expect = require("expect.js"),
    includeFolder = require("../lib/include-folder");


describe("normalize", function() {
    it("handles .DS_Store", function() {
        var normalized = includeFolder.normalize(".DS_Store");
        expect(normalized).to.be.equal("DS_Store");
    });
});

describe("stripExtension", function() {
    it("remove extension", function() {
        var normalized = includeFolder.stripExtension("test.txt");
        expect(normalized).to.be.equal("test");
    });

    it("handles hidden files", function() {
        var normalized = includeFolder.stripExtension(".txt");
        expect(normalized).to.be.equal("txt");
    });
});



describe("include_folder", function() {
    it("is defined", function() {
        expect(includeFolder).to.be.a('function');
    });

    function moduleCheck(folderModule, expectedCount) {
        it("is an object", function() {
            expect(folderModule).to.be.an('object');
        });

        it("has a property for each file", function() {
            expect(Object.keys(folderModule).length).to.be.equal(expectedCount);
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

        source = includeFolder.buildSource("./test/files", /^[^.].*$/),
        folderModule = (new Function("require", "__dirname", source))(require, __dirname + "/files/");

        moduleCheck(folderModule, 3);
    });


    describe("returned object", function() {
        var folderModule = includeFolder("./test/files");

        moduleCheck(folderModule, 3);
    });

    describe("work with hidden files", function() {
        var folderModule = includeFolder("./test/files", /.*/);

        moduleCheck(folderModule, 4);
    });

    describe("when the preserveFilenames option is true", function() {
        beforeEach(function(){
            this.folderModule = includeFolder("./test/files", null, { preserveFilenames: true });
        });

        it("extension is not stripped from file names", function() {
            expect("file1.txt" in this.folderModule).to.be.equal(true);
            expect("file1.check" in this.folderModule).to.be.equal(true);
        });

        it("filename is not normalized", function() {
            expect("file-3-other&file.txt" in this.folderModule).to.be.equal(true);
        });
    });

});