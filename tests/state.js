exports.config =  {
      "id": "4f11ca77-9ee2-48cf-0ea8-5038cc185861",
      "headers": "Authorization: Basic c3lzOmtleQ==\n",
      "url": "localhost:9090/_state",
      "pathVariables": {},
      "preRequestScript": null,
      "method": "GET",
      "collectionId": "274d14af-c802-828c-972e-adae5e5b9ce2",
      "data": null,
      "dataMode": "params",
      "name": "name of localhost:9090/v1/types",
      "description": "",
      "descriptionFormat": "html",
      "time": 1463788969505,
      "version": 2,
      "responses": [],
      "currentHelper": "normal",
      "helperAttributes": {}
}

exports.tests = function () {
      tests['my'] = JSON.parse(responseBody)['state']['uuid'] == 'uuid';
      tests['Status code is 200'] = responseCode.code === 200;
      tests['Body matches string'] = responseBody.has('types');
}
