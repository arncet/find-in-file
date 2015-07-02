# find in file
A simple utility to quickly find text in one or more files.

## Installation
```shell
npm install find-in-file
```

## Usage
```js
var replace = require('replace-in-file');
replace({

  //Single file
  files: 'path/to/file',

  //Or multiple files
  files: [
    'path/to/file',
    'path/to/other/file',
  ],

  //Find a regex
  find: /Find\sme/g,

  //Or a string
  find: 'Find me',
}, function(err, matchedFiles) {
  /*
    matchedFiles => [ { file: 'test1.json', occurrences: 1 },
                      { file: 'test2.json', occurrences: 2 } ]
  */
});
```

## License
(MIT License)

Copyright 2015, [Dave Jeffery](http://www.davejeffery.com) (Original Fork by [Adam Buczynski](http://adambuczynski.com))
