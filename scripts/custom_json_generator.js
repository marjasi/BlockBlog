const customJSONGenerator = new Blockly.Generator("JSON");
customJSONGenerator.PRECEDENCE = 0;

customJSONGenerator['resource_linker'] = function(block) {
  // Get the name of the linker variable.
  var linkerID = block.getField("LINKER_VARIABLE");
  var json = '"' + linkerID.getText() + '"';
  
  return [json, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['resource_definition'] = function(block) {
  var resourceLinker = customJSONGenerator.valueToCode(block, 'RESOURCE_ID', customJSONGenerator.PRECEDENCE);
  var json = '"resource" : {\n"resource_linker" : ' + resourceLinker + '\n}';
  return json;
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
