/**
 * This module is an exaple test of a RESTful API.
 * It's assumed that the application is running on localhost port 9090.
 * It's also assumed that the API has the following endpoints:
 *  - GET    /v1/resources
 *  - PUT    /v1/resources/{resource_name}
 *  - DELETE /v1/resources/{resource_name}
 * Furthermore the API uses Basic HTTP Authentication. We use `user` and `pass` as our credentials.
 * Authentication is added to each request with a simple merge_objects function to reduce code duplication.
 * From exports.run function jetman.send(request) is called since it's assumed that jetman is required globally.
 */

var base_url = 'localhost:9090'

function merge_objects (obj1, obj2) {
  var obj3 = {}
  for (attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (attrname in obj2) { obj3[attrname] = obj2[attrname] }
  return obj3
}

var auth_request = {
  'currentHelper': 'basicAuth',
  'helperAttributes': {
    'username': 'user',
    'password': 'pass'
  }
}

var get_resources = merge_objects(auth_request, {
  'name': 'Get resources',
  'method': 'GET',
  'url': base_url + '/v1/resources'
})

var put_new_resource = merge_objects(auth_request, {
  'name': 'Put `new` resource',
  'method': 'PUT',
  'url': base_url + '/v1/resources/new_resource'
})

var delete_new_resource = merge_objects(auth_request, {
  'name': 'Delete `new` resource',
  'method': 'DELETE',
  'url': base_url + '/v1/resources/new_resource'
})

function baseTest () {
  tests['Status code is 200'] = responseCode.code === 200
  tests['Response time is less than 500ms'] = responseTime < 500
}

function noResourcesExistsTest () {
  tests['Status code is 200'] = responseCode.code === 200
  tests['Response time is less than 500ms'] = responseTime < 500

  var jsonData = JSON.parse(responseBody)
  tests['There are no resources'] = JSON.stringify(jsonData['resources']) === JSON.stringify([])
}

function newResourceExistsTest () {
  tests['Status code is 200'] = responseCode.code === 200
  tests['Response time is less than 500ms'] = responseTime < 500

  var jsonData = JSON.parse(responseBody)
  tests['There is a new resource'] = JSON.stringify(jsonData['resources']) === JSON.stringify(['new_resource'])
}

exports.run = function () {
  jetman.send(get_resources, noResourcesExistsTest)
  jetman.send(put_new_resource, baseTest)
  jetman.send(get_resources, newResourceExistsTest)
  jetman.send(delete_new_resource, baseTest)
  jetman.send(get_resources, noResourcesExistsTest)
}
