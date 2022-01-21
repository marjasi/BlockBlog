// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);
htmlFileDictionary = {};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function updateHtmlFileDictionary(jsonData) {
  for (var jsonElement of jsonData) {
    if (jsonElement.page_name) {
      htmlFileDictionary[jsonElement.page_name] = jsonElement.html_data;
    }
  }
}

function getHtmlFilePageName(htmlFileData) {
  return getKeyByValue(htmlFileDictionary, htmlFileData);
}

function formatWorkspaceJsonData(workspaceJsonData){
  workspaceJsonData = '[\n' + workspaceJsonData + '\n]';
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n{/gm, '},\n{');
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n]/gm, '}\n]');
  return workspaceJsonData;
}

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

function createJSONData() {
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  return formatWorkspaceJsonData(json);
}

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = createJSONData();
  alert(json);
}

function downloadJSON() {
  // Generate JSON code and save it to a file for the user to download.
  jsonFileName = "blocklyREST";
  jsonFileType = "application/json"
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = createJSONData();
  try {
    createDownloadFile(jsonFileName, json, jsonFileType);
  } catch(error) {
    alert("Failed to create JSON file for download.\n" + error)
    console.log(error);
  }
}

function createBlogPreview() {
  var json = createJSONData();
  const blocklyJsondata = JSON.parse(json);
  updateHtmlFileDictionary(blocklyJsondata);
}
