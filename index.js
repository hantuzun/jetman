var _ = require('underscore');
var fs = require('fs');
var jsonfile = require('jsonfile');
var schema = require('js-schema');
var uuid = require('node-uuid');

var util = require('./lib/util.js');


function createCollection(name, tests) {
    testModuleSchema = schema({
        test : Function,
        config : {
            url: String
        }
    });

    function requireTest(test) {
        try {
            testModule = require(test);
        } catch (err) {
            throw new Error('Not found the module: ' + test);
        }

        if ( !testModuleSchema(testModule) ) {
            console.error( 'Validation error for module: ' + util.getModuleId(testModule, module) );
            console.error( testModuleSchema.errors(testModule) );
            throw new Error('Validation error for module: ' + util.getModuleId(testModule, module));
        }

        return testModule;
    }

    function createTestRequest(testModule) {
        c = testModule.config;
        c['tests'] = util.functionBody(testModule.test);
        c['id'] = uuid.v4();
        if (c['headers'] == undefined) {
            c['headers'] = '';
        }
        return c;
    }

    function getId(request) {
        return request['id'];
    }

    testModules = _.map(tests, requireTest);
    requests = _.map(testModules, createTestRequest);
    order = _.map(requests, getId);

    c = {
        'id': uuid.v4(),
        'name': name,
        'order': order,
        'requests': requests
    }

    return c;
}

name = 'example'
filename = name + '.postman_collection'
tests = [
    './tests/state.js',
    './tests/types.js'
]
collection = createCollection(name, tests)
jsonfile.writeFileSync(filename, collection);
