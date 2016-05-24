var _ = require('underscore');
var newman = require('newman');
var schema = require('js-schema');
var uuid = require('node-uuid');
var util = require('./lib/util.js');

var testModuleSchema = schema({
    test : Function,
    config : {
        url: String
    }
});

var defaultNewmanOptions = {
    responseHandler: "TestResponseHandler",
    stopOnError: false,
    summary: true
}

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

exports.createCollection = function (testModules, name) {
    if (name == undefined) {
        var name = ''
    }
    
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

exports.execute = function(testModules, newmanOptions, callback) {
    collection = this.createCollection(testModules);
    options = util.merge(defaultNewmanOptions, newmanOptions);
    newman.execute(collection, options, callback);
}
