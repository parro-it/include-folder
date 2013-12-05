# include-folder
[![Build Status](https://secure.travis-ci.org/parroit/include-folder.png?branch=master)](http://travis-ci.org/parroit/include-folder)  [![Npm module](https://badge.fury.io/js/include-folder.png)](https://npmjs.org/package/include-folder) [![Code Climate](https://codeclimate.com/github/parroit/include-folder.png)](https://codeclimate.com/github/parroit/include-folder)

The best project ever.

## Getting Started
Install the module with: `npm install include-folder --save`

```javascript
var includeFolder = require('include-folder'),
    folder = includeFolder("./aFolder");
```

Supposing that the content of aFolder was the same as in [the sample in test][https://github.com/parroit/include-folder/tree/master/test/files]
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
