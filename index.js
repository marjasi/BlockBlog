// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);

function DownloadFile(fileName, fileContent) {
}

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  alert(json);
}

function saveJSON() {
  // Generate JSON code and save it to a file for the user to download.
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  if (DownloadFile("JSONResult.json", json));
}
