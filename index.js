// Initialize the Blockly workspace.
var demoWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                           demoWorkspace);

function showCode() {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  alert(code);
}

function runCode() {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}