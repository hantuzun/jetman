# [Jetman](https://github.com/emrehan/jetman)
>> Create Postman collections programmatically



## Why?
Because the only way to create Postman tests is using Postman User Interfaces. Well, until now. Introducing Jetman!



## How to Use?
Create your tests in Javascript files. *
Require Jetman.
Call `createCollection(name, tests)` where `name` is the name of the collection file to be generated and `tests` is the ordered list of test script modules*.
Here is an example for creating a Postman collection with Postman:

    var jetman = require( "../jetman" );
    var jsonfile = require('jsonfile');

    name = 'example'
    tests = [
        require ('./tests/state.js'),
        require ('./tests/types.js')
    ]
    collection = jetman.createCollection(name, tests)
    filename = name + '.postman_collection'
    jsonfile.writeFileSync(filename, collection);


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


### Test Function
This exposed function is executed after responses. 
Parameters such as `tests`, `responseCode`, and `responseBody` injected by Postman.
It's the same as writing tests to Postman UI except the possibility of inspecting variables using `console.log()`.
Refer to Postman documentation for help.



## License
MIT License.
