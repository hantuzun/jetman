exports.config =  {
      'name': 'state request',
      'method': 'GET',
      'url': 'localhost:9090/_state',
      'headers': 'Authorization: Basic c3lzOmtleQ==\n'
}

exports.tests = function () {
      tests['uuid is equal to "uuid"'] = JSON.parse(responseBody)['state']['uuid'] == 'uuid';
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Body matches string'] = responseBody.has('types');
}
