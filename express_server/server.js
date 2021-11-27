const { Console } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
htmlFileDictionary = {}

function updateHtmlFileDictionary(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.content_type) {
      htmlFileDictionary[jsonElement.content_type] = jsonElement.html_data;
    }
  }
}

function checkUriPaths(uriPaths) {
  for (var uriPath of uriPaths) {
    if (uriPath.path) {
      return true;
    }
  }

  return false
}

function getResourceNameById(jsonData, resourceId) {
  var resources = jsonData.resource_definitions.resources;
  for (var resource of resources) {
    if (resource.resource_linker === resourceId) {
      return resource.resource_name;
    }
  }

  return null;
}

function registerUriPath(parentUriPath, uriPathData, jsonData) {
  var uriPathValue = parentUriPath + '/' + uriPathData.uri_path;
  var resourceId = uriPathData.resource_linker;
  var resourceName = getResourceNameById(jsonData, resourceId);
  createMockupEndpoint(uriPathValue, resourceName);

  var uriPaths = uriPathData.uri_paths;
  if (checkUriPaths(uriPaths)) {
    for (var uriPath of uriPaths){
      uriPath = uriPath.path;
      registerUriPath(uriPathValue, uriPath, jsonData);
    }
  }
}

function createMockupEndpoints(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.uri) {
      jsonData = jsonElement;
    }
  }
  // Get uri root path and register it as an endpoint.
  var uriRoot = '/' + jsonData.uri.uri_root.root_path;
  createMockupEndpoint(uriRoot, 'URI ROOT');

  // Get and register other endpoints.
  var uriPaths = jsonData.uri.uri_root.uri_paths;
  if (checkUriPaths(uriPaths)) {
    for (var uriPath of uriPaths) {
      uriPath = uriPath.path;
      registerUriPath(uriRoot, uriPath, jsonData);
    }
  }
}
  
function createMockupEndpoint(endpoint, resourceName) {
    app.get(endpoint, (req, res) => {
        res.send('Endpoint created for resource ' + resourceName);
    });
}

// Parse Boockly JSON data.
fs.readFile('blocklyREST.json', 'utf8', (err, fileContents) => {
  if (err) {
    console.error(err)
    return;
  }
  try {
    const blocklyJsondata = JSON.parse(fileContents);
    updateHtmlFileDictionary(blocklyJsondata);
    createMockupEndpoints(blocklyJsondata);
  } catch(err) {
    console.error(err);
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
