# Jetman Documentation



## Writing Tests
Test modules should expose a `run()` function. 
Inside `run()` function `jetman.send(request, testFunction)` where`request` is a Postman request object and `testFunction` is an optional test function (with no parameters) to be executed by Postman.

`testFunction` functions are executed  in Postman sandbox, therefore may have no access the variables you will can create outside its scope.
However, parameters such as `tests`, `responseCode`, and `responseBody` are injected by Postman.
It's similar to writing tests to Postman UI except the possibility of inspecting variables using `console.log()`.
For further help refer to [Postman documentations](https://www.getpostman.com/docs/sandbox) or ask us at [Jetman Gitter Room](https://gitter.im/emrehan/jetman).

Below is an example test module `test.js`:

    request = {
        'name': 'Root endpoint works',
        'method': 'GET',
        'url': 'localhost:9090'
    }

    function test() {
        tests['Status code is 200'] = responseCode.code === 200
        tests['Response time is less than 50ms'] = responseTime < 50
    }

    exports.run = function () {
        jetman.send(request, test)
    }


### Request Objects
`config` object should have at least the `url` parameter. 
`method` parameter defaults to `GET`.
`name` parameter is highly recommended to include since it can help debugging failures.
For further help refer to [Postman documentations](https://www.getpostman.com/docs/requests) or ask us at [Jetman Gitter Room](https://gitter.im/emrehan/jetman).


### Test Function
This exposed function is executed after responses. 



## Running Tests
Install and require Jetman: `var jetman = require('jetman')`

Create your test modules[*](#-how-to-write-test-scripts) in JavaScript.

Call `jetman.execute(tests)`, where `tests` are the ordered list of test modules.
`jetman.execute` has two optional parameters as well: `options` are the options for newman execution, and `callback` is to be executed once Newman is done executing all its  tasks. 
The full method signature is `jetman.execute(tests, options, callback)`

Here is a simple example for running a test with Jetman:

    var jetman = require('jetman')

    jetman.execute([require('./test.js')])


## Sharing the Module Object for Jetman

Every node.js module has a [module object](https://nodejs.org/api/modules.html#modules_the_module_object). 
Sharing this object with Jetman help it providing test module names while running tests or in case of errors.
Therefore, it is strongly recommended to add the following line just after requiring Jetman.

    jetman.setModuleObject(module)



## Examples
Example test modules are located in [examples](examples) folder. 

 * [examples/basic_auth_rest_test.js](examples/basic_auth_rest_test.js)
