var _ = require('underscore');
var schema = require('js-schema');
var uuid = require('node-uuid');
var util = require('./lib/util.js');

var testModuleSchema = schema({
    test : Function,
    config : {
        url: String
    }
});

function validateTestModule(testModule) {
    if ( !testModuleSchema(testModule) ) {
        console.error( 'Validation error for module: ' + util.getModulePath(testModule, module) );
        console.error( testModuleSchema.errors(testModule) );
        throw new Error('Validation error for module: ' + util.getModulePath(testModule, module));
    }
}

function createRequest(testModule) {
    var request = testModule.config;
    request['id'] = uuid.v4();
    request['tests'] = util.functionBody(testModule.test);
    if (request['headers'] == undefined) {
        request['headers'] = '';
    }
    return request;
}

function getId(request) {
    return request['id'];
}

exports.createCollection = function (name, testModules) {
    _.each(testModules, validateTestModule);
    requests = _.map(testModules, createRequest);
    order = _.map(requests, getId);

    return {
        'id': uuid.v4(),
        'name': name,
        'order': order,
        'requests': requests
    }
}
