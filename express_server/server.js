const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
htmlFileDictionary = {};
cssFileDictionary = {};

function updateHtmlFileDictionary(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.page_name) {
      htmlFileDictionary[jsonElement.page_name] = jsonElement.html_data;
    }
  }
}

function updateCssFileDictionary(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.css_file_name) {
      cssFileDictionary[jsonElement.css_file_name] = jsonElement.css_data;
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

function getCssName(urlPaths) {
  if (urlPaths) {
    for (var urlPath of urlPaths) {
      if (urlPath.css_reference) {
        return urlPath.css_reference;
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
  var urlPathValue = parentUrlPath;
  if (urlPathData.url_path) {
    urlPathValue += '/' + urlPathData.url_path;
  }
  var urlPaths = urlPathData.url_paths;
  if (getPageName(urlPaths)) {
    createMockupEndpointWithHtml(urlPathValue, getPageName(urlPaths));
  }
  else if (getCssName(urlPaths)) {
    createMockupEndpointWithCss(urlPathValue, getCssName(urlPaths));
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
      urlPath = urlPath.path ? urlPath.path : urlPath;
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

function createMockupEndpointWithCss(endpoint, cssName) {
  app.get(endpoint, (req, res) => {
      filename = cssName + '.css';
      res.set({
        "Content-Disposition": 'attachment; filename="'+ filename +'"',
        "Content-Type": "	text/css",
      });
      res.send(cssFileDictionary[cssName]);
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
    updateCssFileDictionary(blocklyJsondata);
    createMockupEndpoints(blocklyJsondata);
  } catch(err) {
    console.error(err);
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
