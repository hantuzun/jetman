
<p align="center">
  <img alt="Jetman" src="https://cloud.githubusercontent.com/assets/2770895/15573377/7d6b318a-22fb-11e6-9de6-743608466c14.png">
</p>

<p align="center">
  <b>Create Postman collections programmatically</b>
</p>

<p align="center">
  <a href="https://npmjs.org/package/jetman"><img alt="NPM Version" src="https://img.shields.io/npm/v/jetman.svg"></a>
  <a href="https://travis-ci.com/emrehan/jetman"><img alt="Build Status" src="https://travis-ci.com/emrehan/jetman.svg?token=6mGgqf5q8dpxwiXrxzAR&branch=master"></a>
  <a href="http://standardjs.com/"><img alt="JavaScript Standard Style" src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg"></a>
  <a href="https://gitter.im/emrehan/jetman?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img alt="Gitter" src="https://badges.gitter.im/emrehan/jetman.svg"></a>
  <a href="http://doge.mit-license.org"><img alt="License" src="http://img.shields.io/:license-mit-blue.svg"></a>
</p>



## Why?
Because the only way to create Postman tests is using Postman User Interfaces. Well, until now. Introducing Jetman!



## How to Start?
Install and require Jetman: `var jetman = require('jetman');`

Create your test modules in JavaScript.

Call `jetman.execute(tests)`, where `tests` are an ordered array of your test modules.

Here is a simple example for running a test with Jetman:

    jetman = require('jetman');
    var test = require('./test.js');

    jetman.execute([test]);



## How to Write Test Modules?
Test script modules must expose a `run()` function and inside that they can call `jetman.send(request, testFunction)` method.
`request` is a Postman request object. `testFunction` is an optional test function.

Below is an example test module `test.js`:

    request =  {
        'name': 'Root endpoint works',
        'method': 'GET',
        'url': 'localhost:9090'
    }

    function baseTest() {
        tests['Status code is 200'] = responseCode.code === 200;
        tests['Response time is less than 500ms'] = responseTime < 500;
    }

    exports.run = function () {
        jetman.send(request, baseTest);
    }



## Documentation
For full documentation refer to [docs](docs).

Jetman can execute tests with options and callback. It can also save your tests as a Postman collection.



## Development
Clone the repo and install dependencies with `npm install`.
It's recommended to use Jetman from another module with tests.

Write to us on our [Jetman Gitter Chat Room](https://gitter.im/emrehan/jetman)!



## Testing
Run `npm test`.



## License
[MIT License](LICENSE)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![Analytics](https://ga-beacon.appspot.com/UA-78341852-1/chromeskel_a/readme?pixel)](http://tuzun.co)
