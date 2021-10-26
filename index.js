// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var code = customJSONGenerator.workspaceToCode(blockWorkspace);
  alert(code);
}

function saveJSON() {
  // Generate JSON code and save it to a file.
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
}
