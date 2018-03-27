var _ = require('underscore')
var newman = require('newman')
var uuid = require('uuid')
var util = require('./lib/util.js')

var testModuleChildren

var collectionId = uuid.v4()
var requests = []
var folders = []
var folderOrder = []
var foldersOrder = []
var folderId

var defaultNewmanOptions = {
  responseHandler: 'TestResponseHandler',
  stopOnError: false,
  summary: true,
  timeout: 24 * 60 * 60 * 1000
}

function createRequest (testModule) {
  try {
    folderId = uuid.v4()
    folderOrder = []

    testModule.run()

    foldersOrder.push(folderId)
    folders.push(util.deepCopy({
      id: folderId,
      name: util.getModuleFilename(testModule, testModuleChildren),
      order: util.deepCopy(folderOrder)
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
  var requestId = uuid.v4()
  folderOrder.push(requestId)

  request['id'] = requestId
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
    name = 'Jetman Collection'
  }

  requests = []
  _.each(testModules, createRequest)

  if (testModuleChildren === undefined) {
    return {
      'id': collectionId,
      'name': name,
      'order': [],
      'foldersOrder': foldersOrder,
      'requests': requests
    }
  } else {
    return {
      'id': collectionId,
      'name': name,
      'order': [],
      'foldersOrder': foldersOrder,
      'folders': folders,
      'requests': requests
    }
  }
}

exports.execute = function (testModules, newmanOptions, callback) {
  var pjson = require('./package.json')
  console.log('Jetman version ' + pjson.version)
  var collection = this.createCollection(testModules)
  var options = _.extend({collection: collection, reporters: 'cli'}, defaultNewmanOptions, newmanOptions)
  newman.run(
    options,
    callback
  )
}
