# [Jetman](https://github.com/emrehan/jetman)
> Create Postman collections programmatically

[![Build Status](https://travis-ci.com/emrehan/jetman.svg?token=6mGgqf5q8dpxwiXrxzAR&branch=master)](https://travis-ci.com/emrehan/jetman)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)


## Why?
Because the only way to create Postman tests is using Postman User Interfaces. Well, until now. Introducing Jetman!



## How to Use?
Create your test modules[*](#-how-to-write-test-scripts) in JavaScript.

Require Jetman.

Call `execute(tests, options, callback)`, where `tests` are the ordered list of test script modules[*](#-how-to-write-test-scripts), `options` are the options for newman execution, and `callback` is to be executed once Newman is done executing all its tasks.
`options` and `callback` are optional.

Here is a simple example for running a test with jetman:

    var jetman = require('jetman');

    jetman.execute([require('./test.js')]);



Run [newman](https://www.npmjs.com/package/newman) with the generated collection file.

    newman -c example.postman_collection



## * How to Write Test Scripts?
Test script modules should expose a `config` object and a `test` function.
Below is an example test script:

    exports.config =  {
          'url': 'localhost:9090'
    }

    exports.test = function () {
          tests['Status code is 200'] = responseCode.code === 200;
    }


### Config Object
`config` object should have at least the `url` parameter. 
`method` parameter defaults to `GET`.
`name` parameter is highly recommended to include since it can help debugging failures.
Refer to Postman documentations for help.


### Test Function
This exposed function is executed after responses. 
Parameters such as `tests`, `responseCode`, and `responseBody` are injected by Postman.
It's the same as writing tests to Postman UI except the possibility of inspecting variables using `console.log()`.
Refer to Postman documentations for help.



## Development
Clone the repo and install dependencies with `npm install`.
It's recommended to use jetman from another module with tests.



## Testing
Run `npm test`.



## License
MIT License.
