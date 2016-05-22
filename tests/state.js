exports.config =  {
      'name': 'state request',
      'url': 'localhost:9090/_state',
      'headers': 'Authorization: Basic c3lzOmtleQ==\n',
      'method': 'GET'
}

exports.test = function () {
      tests['uuid is equal to "uuid"'] = JSON.parse(responseBody)['state']['uuid'] == 'uuid';
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Body matches string'] = responseBody.has('types');
}
