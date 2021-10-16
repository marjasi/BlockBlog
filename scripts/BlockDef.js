/*Blockly.Blocks['connection'] = {
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
};*/

var uriRootJson = {
  "type": "uri_root",
  "message0": "URI Root %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "URI",
      "check": [
        "uri_static",
        "uri_dynamic"
      ]
    }
  ],
  "inputsInline": false,
  "colour": 0,
  "tooltip": "This block defines the URI scheme's root address.",
  "helpUrl": ""
}

Blockly.Blocks['uri_root'] = {
  init: function() {
    this.jsonInit(uriRootJson);
  }
}

var uriStaticJson = {
  "type": "uri_static",
  "message0": "Static URI %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "URI",
      "check": [
        "uri_static",
        "uri_dynamic"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "uri_static",
    "uri_dynamic",
    "uri_root"
  ],
  "nextStatement": [
    "uri_static",
    "uri_dynamic"
  ],
  "colour": 30,
  "tooltip": "A block that defines a static part of the URI scheme.",
  "helpUrl": ""
}

Blockly.Blocks['uri_static'] = {
  init: function() {
    this.jsonInit(uriStaticJson);
  }
}
