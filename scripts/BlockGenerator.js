Blockly.JavaScript['connection'] = function(block) {
  var text_ip1 = block.getFieldValue('IP1');
  var value_ip_value_1 = Blockly.JavaScript.valueToCode(block, 'IP_VALUE_1', Blockly.JavaScript.ORDER_ATOMIC);
  var text_ip2 = block.getFieldValue('IP2');
  var value_ip_value_2 = Blockly.JavaScript.valueToCode(block, 'IP_VALUE_2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_types = block.getFieldValue('TYPES');
  var statements_process = Blockly.JavaScript.statementToCode(block, 'PROCESS');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['email'] = function(block) {
  var text_email_file = block.getFieldValue('EMAIL_FILE');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};