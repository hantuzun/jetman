# [Jetman](https://github.com/emrehan/jetman) [![Build Status](https://travis-ci.com/emrehan/jetman.svg?token=6mGgqf5q8dpxwiXrxzAR&branch=master)](https://travis-ci.com/emrehan/jetman) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

###### Create Postman collections programmatically

[![NPM](https://nodei.co/npm/jetman.png?compact=true)](https://npmjs.org/package/jetman)



## Why?
Because the only way to create Postman tests is using Postman User Interfaces. Well, until now. Introducing Jetman!



## How to Start?
Install and require Jetman: `var jetman = require('jetman');`

Create your test modules in JavaScript.

Call `jetman.execute(tests)`, where `tests` are an ordered array of your test modules.

Here is a simple example for running a test with Jetman:

    var jetman = require('jetman');
    var test = require('./test.js');

    jetman.execute([test]);



## How to Write Test Modules?
Test script modules should expose a `config` object and a `test()` function.
Below is an example test module `test.js`:

    exports.config =  {
          'url': 'localhost:9090'
    }

    exports.test = function () {
          tests['Status code is 200'] = responseCode.code === 200;
    }



## Documentation
For full documentation refer to [docs](docs/intro.md).

Jetman can execute tests with options and callback. It can also save your tests as a Postman collection.



## Development
Clone the repo and install dependencies with `npm install`.
It's recommended to use Jetman from another module with tests.



## Testing
Run `npm test`.



## License
MIT License.
