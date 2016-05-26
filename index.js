var _ = require('underscore');
var newman = require('newman');
var uuid = require('node-uuid');
var util = require('./lib/util.js');

var requests = [];
var folders = [];
var folder_order = [];
var order = [];

var testModuleChildren = undefined;

var defaultNewmanOptions = {
    responseHandler: "TestResponseHandler",
    stopOnError: false,
    summary: true
}

function createRequest(testModule) {
    try {
        folder_id = uuid.v4();
        name = util.getModuleFilename(testModule, testModuleChildren);
        folder_order = [];

        testModule.run();

        folders.push(util.deepCopy({
            id: folder_id,
            name: name,
            order: util.deepCopy(folder_order)
        }));
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
    request_id = uuid.v4();
    request['id'] = request_id;
    if (request['headers'] == undefined) {
        request['headers'] = '';
    }
    if (testFunction !== undefined) {
        request['tests'] = util.functionBody(testFunction);
    }
    request['folder'] = folder_id;
    folder_order.push(request_id);
    order.push(request_id);
    
    requests.push(util.deepCopy(request));
}

exports.createCollection = function (testModules, name) {
    if (name == undefined) {
        var name = '';
    }

    requests = [];
    _.each(testModules, createRequest);

    if (testModuleChildren == undefined) {
        return {
            'id': uuid.v4(),
            'name': name,
            'order': order,
            'requests': requests
        }
    } else {
        return {
            'id': uuid.v4(),
            'name': name,
            'order': [],
            'folders': folders,
            'requests': requests
        }
    }
}

exports.execute = function(testModules, newmanOptions, callback) {
    var collection = this.createCollection(testModules);
    var options = util.merge(defaultNewmanOptions, newmanOptions);
    newman.execute(collection, options, callback);
}
