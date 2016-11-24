var _ = require('underscore')
var newman = require('newman')
var uuid = require('uuid')
var util = require('./lib/util.js')

var testModuleChildren

var requests = []
var folders = []
var folder_order = []
var order = []
var folder_id

var defaultNewmanOptions = {
  responseHandler: 'TestResponseHandler',
  stopOnError: false,
  summary: true
}

function createRequest (testModule) {
  try {
    folder_id = uuid.v4()
    folder_order = []

    testModule.run()

    folders.push(util.deepCopy({
      id: folder_id,
      name: util.getModuleFilename(testModule, testModuleChildren),
      order: util.deepCopy(folder_order)
    }))
  } catch(err) {
    if (testModuleChildren !== undefined) {
      console.log('Exception thrown for module: ' + util.getModulePath(testModule, testModuleChildren))
    } else {
      console.log('Exception thrown for a module. Call `jetman.setModuleObject(module)` before the tests to find the faulty module.')
    }
    throw (err)
  }
}

exports.setModuleObject = function (module) {
  testModuleChildren = module.children
}

exports.send = function (request, testFunction) {
  var request_id = uuid.v4()
  request['folder'] = folder_id
  request['id'] = request_id
  folder_order.push(request_id)
  order.push(request_id)
  if (request['name'] === undefined) {
    request['name'] = ''
  }
  if (request['headers'] === undefined) {
    request['headers'] = ''
  }
  if (testFunction === undefined) {
    request['tests'] = ''
  } else {
    request['tests'] = util.functionBody(testFunction)
  }
  requests.push(util.deepCopy(request))
}

exports.createCollection = function (testModules, name) {
  if (name === undefined) {
    name = ''
  }

  requests = []
  _.each(testModules, createRequest)

  if (testModuleChildren === undefined) {
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

exports.execute = function (testModules, newmanOptions, callback) {
  var collection = this.createCollection(testModules)
  var options = util.merge(defaultNewmanOptions, newmanOptions)
  newman.execute(collection, options, callback)
}
