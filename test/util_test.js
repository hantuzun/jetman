var util = require('../lib/util.js');
var chai = require('chai');
var expect = chai.expect;

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
