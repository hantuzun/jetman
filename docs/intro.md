## Writing Tests
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



## Running Tests
Install and require Jetman: `var jetman = require('jetman');`

Create your test modules[*](#-how-to-write-test-scripts) in JavaScript.

Call `jetman.execute(tests)`, where `tests` are the ordered list of test script modules[*](#-how-to-write-test-scripts).
`jetman.execute` has two optional parameters as well: `options` are the options for newman execution, and `callback` is to be executed once Newman is done executing all its  tasks. 
The full method signature is `jetman.execute(tests, options, callback)`

Here is a simple example for running a test with Jetman:

    var jetman = require('jetman');

    jetman.execute([require('./test.js')]);
