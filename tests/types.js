request = {
      "id": "b35d866f-4f0a-d748-46ae-2dfe4a961d1b",
      "headers": "Authorization: Basic c3lzOmtleQ==\n",
      "url": "localhost:9090/v1/types",
      "pathVariables": {},
      "preRequestScript": null,
      "method": "GET",
      "collectionId": "7e375cc1-c3a7-d546-fde7-7dee761e1789",
      "data": null,
      "dataMode": "params",
      "name": "localhost:9090/v1/types",
      "description": "types request def\n",
      "descriptionFormat": "html",
      "time": 1463869542314,
      "version": 2,
      "responses": [],
      "tests": "tests[\"Status code is 200\"] = \n    responseCode.code === 200;\n\ntests[\"Response time is less than 200ms\"] = \n    responseTime < 200;\n\ntests[\"Body matches string\"] = \n    responseBody.has(\"types\");\n",
      "currentHelper": "basicAuth",
      "helperAttributes": {
            "id": "basic",
            "username": "sys",
            "password": "key",
            "saveToRequest": true
      }
}

module.exports = { request: request };