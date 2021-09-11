Blockly.Blocks['connection'] = {
  init: function() {
    this.appendValueInput("IP_VALUE_1")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("IP1"), "IP1");
    this.appendValueInput("IP_VALUE_2")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("IP2"), "IP2");
    this.appendStatementInput("PROCESS")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["FTP","FTP"], ["HTTP","HTTP"], ["SMTP","SMTP"]]), "TYPES");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("A block used to initiate a connection between two devices.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['email'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("Email Text File"), "EMAIL_FILE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};