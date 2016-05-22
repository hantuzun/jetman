var fs = require('fs');
var jsonfile = require('jsonfile');
var _ = require('underscore');
var uuid = require('node-uuid');

var util = require('./lib/util.js');

collectionName = 'example_colection'
testDir = 'tests'
order = ['state', 'types']

function requireTest(testName) {
     return require('./' + testDir + '/' + testName + '.js');
}

function createTestRequest(test) {
    c = test.config;
    c['tests'] = util.functionBody(test.tests)
    return c;
}

var tests = _.map(order, requireTest);
var configs = _.map(tests, createTestRequest);
var ids = _.map(configs, function(config){ return config['id'] });

c = {
    'id': uuid.v4(),
    'name': collectionName,
    'order': ids,
    'requests': configs
}

jsonfile.writeFileSync(collectionName + '.postman_collection', c);
