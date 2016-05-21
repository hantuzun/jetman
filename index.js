var fs = require('fs');
var jsonfile = require('jsonfile');
var _ = require('underscore');

collectionName = 'example_colection'
testDir = 'tests'
order = ['state', 'types']

var tests = _.map(order, function(str){ return require('./' + testDir + '/' + str + '.js'); });
var requests = _.map(tests, function(test){ return test.request });
var ids = _.map(requests, function(request){ return request['id'] });

c = {
    'id': '274d14af-c802-828c-972e-adae5e5b9ce2',
    'name': collectionName,
    'order': ids,
    'folders': [],
    'timestamp': 1463788969505,
    'requests': requests
}

jsonfile.writeFileSync(collectionName + '.postman_collection', c);
