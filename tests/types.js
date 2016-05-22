exports.config = {
      'name': 'types request',
      'method': 'GET',
      'url': 'localhost:9090/v1/types',
      'headers': 'Authorization: Basic c3lzOmtleQ==\n'
}

exports.test = function () {
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Response time is less than 500ms'] = responseTime < 500;
      tests['Body matches string'] = responseBody.has('types');
}
