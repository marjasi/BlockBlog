const customJSONGenerator = new Blockly.Generator("JSON");
customJSONGenerator.PRECEDENCE = 0;

customJSONGenerator['resource_linker'] = function(block) {
  // Get the name of the variable
  var linkerID = block.getField("LINKER_VARIABLE");
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + "resource_link" + '"' + " : " + '"' + linkerID.getText() + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['resource_definition'] = function(block) {
  var value_resource_id = Blockly.JavaScript.valueToCode(block, 'RESOURCE_ID', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

customJSONGenerator['uri_root'] = function(block) {
  var text_uri_root = block.getFieldValue('URI_ROOT');
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

customJSONGenerator['uri_static'] = function(block) {
  var text_uri_static = block.getFieldValue('URI_STATIC');
  var value_resource_linker = Blockly.JavaScript.valueToCode(block, 'RESOURCE_LINKER', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;';
  return code;
};

customJSONGenerator['uri_dynamic'] = function(block) {
  var text_uri_dynamic = block.getFieldValue('URI_DYNAMIC');
  var value_resource_linker = Blockly.JavaScript.valueToCode(block, 'RESOURCE_LINKER', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
