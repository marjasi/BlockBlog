const express = require('express');
const app = express();
const fs = require('fs');

//function getEndpiontsAndResourceNames

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
    const blocklyJsondata = JSON.parse(fileContents)
    console.log(blocklyJsondata.resource_definitions.resources[0].resource_linker);
    console.log(blocklyJsondata.resource_definitions.resources[0].resource_name);
    console.log(blocklyJsondata.uri.uri_root.root_path);
    console.log(blocklyJsondata.uri.uri_root.uri_paths[2])
  } catch(err) {
    console.error(err);
  }
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
