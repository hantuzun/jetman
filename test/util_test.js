var util = require('../lib/util.js');
var chai = require('chai');
var should = chai.should();
chai.use(require('chai-string'));

var fn  = function () {
      tests['uuid is equal to "uuid"'] = JSON.parse(responseBody)['state']['uuid'] == 'uuid';
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Body matches string'] = responseBody.has('types');
}

var fnBody = `
      tests['uuid is equal to "uuid"'] = JSON.parse(responseBody)['state']['uuid'] == 'uuid';
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Body matches string'] = responseBody.has('types');
`

describe('functionBody', function() {
  it('functionBody() should return function body as a string', function() {
    util.functionBody(fn).should.equal(fnBody);
  });
});

describe('getModulePath', function() {
  it('getModulePath() should return the path of the given module', function() {
    util.getModulePath(chai, module).should.endWith('node_modules/chai/index.js');
  });
});
