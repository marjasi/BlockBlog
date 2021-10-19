Blockly.JavaScript['resource_linker'] = function(block) {
  var variable_linker_variable = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('LINKER_VARIABLE'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['resource_definition'] = function(block) {
  var value_resource_id = Blockly.JavaScript.valueToCode(block, 'RESOURCE_ID', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['uri_root'] = function(block) {
  var text_uri_root = block.getFieldValue('URI_ROOT');
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['uri_static'] = function(block) {
  var text_uri_static = block.getFieldValue('URI_STATIC');
  var value_resource_linker = Blockly.JavaScript.valueToCode(block, 'RESOURCE_LINKER', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;';
  return code;
};

Blockly.JavaScript['uri_dynamic'] = function(block) {
  var text_uri_dynamic = block.getFieldValue('URI_DYNAMIC');
  var value_resource_linker = Blockly.JavaScript.valueToCode(block, 'RESOURCE_LINKER', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_uri = Blockly.JavaScript.statementToCode(block, 'URI');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
