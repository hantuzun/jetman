var util = require('../lib/util.js');
var chai = require('chai');
var expect = chai.expect;
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
    expect(util.functionBody(fn)).to.equal(fnBody);
  });
});

describe('getModulePath', function() {
  it('getModulePath(module, moduleChildren) should return the path of the given module', function() {
    expect(util.getModulePath(chai, module.children)).to.endWith('node_modules/chai/index.js');
  });
});

describe('getModulePath', function() {
  it('getModulePath(module, moduleChildren) should return undefined if moduleChildren is undefined', function() {
    expect(util.getModulePath(chai, undefined)).to.equal(undefined);
  });
});

describe('getModuleFilename', function() {
  it('getModuleFilename(module, moduleChildren) should return the file name of the given module`s main funciton', function() {
    expect(util.getModuleFilename(chai, module.children)).to.equal('index');
  });
});

describe('getModuleFilename', function() {
  it('getModuleFilename(module, moduleChildren) should return undefined if moduleChildren is undefined', function() {
    expect(util.getModuleFilename(chai, undefined)).to.equal(undefined);
  });
});
