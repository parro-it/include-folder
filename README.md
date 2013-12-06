# include-folder
[![Build Status](https://secure.travis-ci.org/parroit/include-folder.png?branch=master)](http://travis-ci.org/parroit/include-folder)  [![Npm module](https://badge.fury.io/js/include-folder.png)](https://npmjs.org/package/include-folder) [![Code Climate](https://codeclimate.com/repos/52a0d507f3ea004212037112/badges/0d17143b49ddb8284f13/gpa.png)](https://codeclimate.com/repos/52a0d507f3ea004212037112/feed)

Expose the content of each file in a folder as an object property.

This module is browserifiable using the [folderify transform][]


## Getting Started
Install the module with: `npm install include-folder --save`

The use like this:

```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder");
```

Supposing that the content of aFolder was the same as in [the sample in test](https://github.com/parroit/include-folder/tree/master/test/files)
folder var will contains:

```javascript
{
    file3OtherFile: 'this is file3OtherContent content',
    file1: 'this is file1 content',
    file1_1: 'this is file1_1 content'
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.


## License
Copyright (c) 2013 parroit  
Licensed under the MIT license.

folderify transform: [https://github.com/parroit/folderify]