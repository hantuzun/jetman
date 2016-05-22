exports.config = {
      'name': 'types request',
      'url': 'localhost:9090/v1/types',
      'headers': 'Authorization: Basic c3lzOmtleQ==\n',
      'method': 'GET',
      'dataMode': 'params',
      'id': 'b35d866f-4f0a-d748-46ae-2dfe4a961d1b'
}

exports.tests = function () {
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Response time is less than 500ms'] = responseTime < 500;
      tests['Body matches string'] = responseBody.has('types');
}
