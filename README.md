# include-folder
[![Build Status](https://secure.travis-ci.org/parro-it/include-folder.png?branch=master)](http://travis-ci.org/parro-it/include-folder)  [![Npm module](https://badge.fury.io/js/include-folder.png)](https://npmjs.org/package/include-folder) [![Code Climate](https://codeclimate.com/github/parro-it/include-folder/badges/gpa.svg)](https://codeclimate.com/github/parro-it/include-folder)

Expose the content of each file in a folder as an object property.

This module is browserifiable using the [folderify transform](https://github.com/parro-it/folderify)


## Getting Started
Install the module with: `npm install include-folder --save`

Then use like this:

```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder");
```

Supposing that the content of aFolder was the same as in [the sample in test](https://github.com/parro-it/include-folder/tree/master/test/files)
folder var will contains:

```javascript
{
    file3OtherFile: 'this is file3OtherContent content',
    file1: 'this is file1 content',
    file1_1: 'this is file1_1 content'
}
```

## Recursion

You can include files recursive using the `recurse` parameter:


```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder",/^a.*/, { recurse: true });
```

This include files that start with 'a', in any subfolder, subfolders are created as object properties.

## Filter included files

You can filter which files to include using the filter parameter:

### Using Globs

```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder", [ '**/*.txt', '!README*' ]);
```

This includes every *.txt recursively (if a pattern references subfolders, `options.recurse` is enabled automatically) but excludes files starting with "README".

(see https://github.com/sindresorhus/multimatch for details on matching with multiple globs)

### Using a Regular Expression

```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder",/^a.*/);
```

This only include files that start with 'a'

Filter parameters defaults to /^[^.].*$/, which include every file
in the folder, except hidden ones (these that has a name starting with dot).

## Preserve filenames

To prevent normalization and stripping of the extension in the result object, the `preserveFilenames` option can be used:

```javascript
includeFolder('./www', null, { preserveFilenames: true });
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.


## License

Copyright (c) 2013 Andrea Parodi

Licensed under the MIT license.
