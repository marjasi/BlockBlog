// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);

function createDownloadFile(fileName, fileContent, fileType) {
  const blobFile = new Blob([fileContent], {type: fileType});
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blobFile, {oneTimeOnly: true});
  element.download = fileName;
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  json = '[\n' + json + '\n]';
  alert(json);
}

function downloadJSON() {
  // Generate JSON code and save it to a file for the user to download.
  jsonFileName = "blocklyREST";
  jsonFileType = "application/json"
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  json = '[\n' + json + '\n]';
  try {
    createDownloadFile(jsonFileName, json, jsonFileType);
  } catch(error) {
    alert("Failed to create JSON file for download.\n" + error)
    console.log(error);
  }
}
