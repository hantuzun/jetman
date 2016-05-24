var _ = require('underscore');
var newman = require('newman');
var uuid = require('node-uuid');
var util = require('./lib/util.js');

var testModuleChildren = undefined;

var defaultNewmanOptions = {
    responseHandler: "TestResponseHandler",
    stopOnError: false,
    summary: true
}

function createRequest(testModule) {
    try {
        testModule.run();
    } catch(err) {
        if (testModuleChildren !== undefined) {
            console.log('Exception thrown for module: ' + util.getModulePath(testModule, testModuleChildren));
        } else {
            console.log('Exception thrown for a module. Call `jetman.setModuleObject(module);` before the tests to find the faulty module.');
        }
        throw(err);
    }
}

function getId(request) {
    return request['id'];
}

exports.setModuleObject = function (module) {
    testModuleChildren = module.children;
}

exports.send = function (request, testFunction) {
    request['id'] = uuid.v4();
    if (request['headers'] == undefined) {
        request['headers'] = '';
    }
    if (testFunction !== undefined) {
        request['tests'] = util.functionBody(testFunction);
    }
    
    requests.push(util.deepCopy(request));
}

exports.createCollection = function (testModules, name) {
    if (name == undefined) {
        var name = ''
    }

    requests = [];
    
    _.each(testModules, createRequest);
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
