
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

------------------------------------------------------------------------------------------------------------------------

## Why?
[Postman](https://www.getpostman.com) is a great tool for testing APIs.

However, its tests can only be created from [Postman Apps](https://www.getpostman.com/apps). Writing and maintaining tests on these GUIs is a pain compared to text editors. Moreover, these tests cannot be secured or shared under version control systems or cannot be debugged.

Introducing Jetman!



## How to Use Jetman?
 * Create a node project for testing your API and require Jetman: `jetman = require('jetman');`
 * Write your test modules in JavaScript files.
 * Call `jetman.execute(tests)` with your test modules.

Here is a simple application for running one Jetman test:

```js
jetman = require('jetman');
var test = require('./test.js');

jetman.execute([test]);
```



## How to Write Jetman Tests?
Jetman tests are JavaScript files on your test project. They must expose a `run()` function and inside that they should call `jetman.send(request, testFunction)` method to use Postman.
In this function `request` is a Postman request object and `testFunction` is an optional test function.

Below is an example test module named `test.js`:

```js
var request =  {
  'name': 'Root endpoint works',
  'method': 'GET',
  'url': 'localhost:9090'
}

function test() {
  tests['Status code is 200'] = responseCode.code === 200;
  tests['Response time is less than 500ms'] = responseTime < 500;
}

exports.run = function () {
  jetman.send(request, test);
}
```



## Documentation
Jetman can execute tests with options and callback. It can also save your tests as Postman collections.

For full documentation refer to [docs](docs).



## Development
Clone the repo and install dependencies with `npm install`.
It's recommended to use Jetman from another module with tests.

Write to us on our [Jetman Gitter Chat Room](https://gitter.im/emrehan/jetman)!



## Testing
Run `npm test`. This command runs unit tests and tests the project for [JavaScript Standard Style](http://standardjs.com/) compatibility.



## License
[MIT](LICENSE)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![Analytics](https://ga-beacon.appspot.com/UA-78341852-1/chromeskel_a/readme?pixel)](http://tuzun.co)
