// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);

function createDownloadFile(fileName, fileContent, fileType) {
  const blobFile = new Blob([fileContent], {type: fileType});
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blobFile, fileName);
  }
  else {
    const element = window.document.createElement('Download');
    element.href = window.URL.createObjectURL(blobFile, {oneTimeOnly: true});
    element.download = fileName;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

function createJSONFileForDownload(fileName, fileContent) {
  var jsonFile = new File([fileContent], fileName);
  var downloadLink = document.createElement('Download');
  downloadLink.download = jsonFile.name;
  downloadLink.href = jsonFile;
  downloadLink.click();
}

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  alert(json);
}

function downloadJSON() {
  // Generate JSON code and save it to a file for the user to download.
  jsonFileName = "blocklyREST.json";
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  try {
    createJSONFileForDownload(jsonFileName, json);
  } catch(error) {
    alert("Failed to create JSON file for download.\n" + error)
    console.log(error);
  }
}