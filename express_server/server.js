const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
htmlFileDictionary = {};

function updateHtmlFileDictionary(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.page_name) {
      htmlFileDictionary[jsonElement.page_name] = jsonElement.html_data;
    }
  }
}

function getPageName(urlPaths) {
  if (urlPaths) {
    for (var urlPath of urlPaths) {
      if (urlPath.page_reference) {
        return urlPath.page_reference;
      }
    }
  }

  return null;
}

function checkUrlPaths(urlPaths) {
  if (urlPaths) {
    for (var urlPath of urlPaths) {
      if (urlPath.path) {
        return true;
      }
    }
  }

  return false
}

function registerUrlPath(parentUrlPath, urlPathData, jsonData) {
  var urlPathValue = parentUrlPath + '/' + urlPathData.url_path;
  var urlPaths = urlPathData.url_paths;
  if (getPageName(urlPaths)) {
    createMockupEndpointWithHtml(urlPathValue, getPageName(urlPaths));
  }
  else {
    createMockupEndpoint(urlPathValue);
  }

  if (checkUrlPaths(urlPaths)) {
    for (var urlPath of urlPaths) {
      // Check if the child element is a url.
      if (urlPath.path) {
      urlPath = urlPath.path;
        registerUrlPath(urlPathValue, urlPath, jsonData);
      }
    }
  }
}

function createMockupEndpoints(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.url_schema) {
      jsonData = jsonElement;
    }
  }
  // Get url root path and register it as an endpoint.
  var urlRoot = '/' + jsonData.url_schema.url_root.root_path;
  createMockupEndpoint(urlRoot);

  // Get and register other endpoints.
  var urlPaths = jsonData.url_schema.url_root.url_paths;
  if (checkUrlPaths(urlPaths)) {
    for (var urlPath of urlPaths) {
      urlPath = urlPath.path;
      registerUrlPath(urlRoot, urlPath, jsonData);
    }
  }
}

function createMockupEndpointWithHtml(endpoint, pageName) {
  app.get(endpoint, (req, res) => {
      filename = pageName + '.html';
      res.set({
        "Content-Disposition": 'attachment; filename="'+ filename +'"',
        "Content-Type": "	text/html",
      });
      res.send(htmlFileDictionary[pageName]);
  });
}
  
function createMockupEndpoint(endpoint) {
    app.get(endpoint, (req, res) => {
        res.send('Endpoint ' + endpoint + ' created.');
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
