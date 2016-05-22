var _ = require('underscore');
var fs = require('fs');
var jsonfile = require('jsonfile');
var uuid = require('node-uuid');

var util = require('./lib/util.js');

function writeCollection(name, tests) {
    function requireTest(test) {
        // try {
        testModule =  require(test);
        // } catch (Exception e) {
        //     throw new Exception();
        // }
        // if (testModule.config == undefined) {
        //     throw new Exception();
        // }
        // if (testModule.tests == undefined ) {
        //     throw new Exception();
        // }
        return testModule;
    }

    function createTestRequest(testModule) {
        c = testModule.config;
        c['tests'] = util.functionBody(testModule.tests);
        c['id'] = uuid.v4();
        return c;
    }

    function getId(request) {
        return request['id'];
    }

    var testModules = _.map(tests, requireTest);
    var requests = _.map(testModules, createTestRequest);
    var order = _.map(requests, getId);

    c = {
        'id': uuid.v4(),
        'name': name,
        'order': order,
        'requests': requests
    }

    jsonfile.writeFileSync(name + '.postman_collection', c);
}

name = 'example_colection'
tests = [
    './tests/state.js', 
    './tests/types.js'
]

writeCollection(name, tests);
