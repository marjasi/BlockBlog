var resourceLinkerJson = {
  "type": "resource_linker",
  "message0": "%1",
  "args0": [
    {
      "type": "field_variable",
      "name": "LINKER_VARIABLE",
      "variable": "Linker ID"
    }
  ],
  "inputsInline": false,
  "output": "resource_linker",
  "colour": 150,
  "tooltip": "A linker value that points to a resource definition.",
  "helpUrl": ""
}

Blockly.Blocks['resource_linker'] = {
  init: function() {
    this.jsonInit(resourceLinkerJson);
  }
}

var resourceDefinitionJson = {
  "type": "resource_definition",
  "message0": "Resource Definition %1 Resource Linker %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "RESOURCE_ID",
      "check": "resource_linker"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "A definition of a resource.",
  "helpUrl": ""
}

Blockly.Blocks['resource_definition'] = {
  init: function() {
    this.jsonInit(resourceDefinitionJson);
  }
}

var resourceDefinitionsJson = {
  "type": "resource_definitions",
  "message0": "Resource Definitions %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "RESOURCES",
      "check": "resource_definition"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "colour": 165,
  "tooltip": "This block defines the resource definitions used by the REST API.",
  "helpUrl": ""
}

Blockly.Blocks['resource_definitions'] = {
  init: function() {
    this.jsonInit(resourceDefinitionsJson);
  }
}

var uriRootJson = {
  "type": "uri_root",
  "message0": "URI Root %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "URI_ROOT",
      "text": "URI Path"
    },
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
  "previousStatement": null,
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
  "message0": "Static URI %1 %2 Resource Linker %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "URI_STATIC",
      "text": "URI Path"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "RESOURCE_LINKER",
      "check": "resource_linker"
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
  "colour": 330,
  "tooltip": "A block that defines a static part of the URI scheme.",
  "helpUrl": ""
}

Blockly.Blocks['uri_static'] = {
  init: function() {
    this.jsonInit(uriStaticJson);
  }
}

var uriDynamicJson = {
  "type": "uri_dynamic",
  "message0": "Dynamic URI %1 %2 Resource Linker %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "URI_DYNAMIC",
      "text": "URI Path"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "RESOURCE_LINKER",
      "check": "resource_linker"
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
  "colour": 225,
  "tooltip": "A block that defines a dynamic part of the URI scheme.",
  "helpUrl": ""
}

Blockly.Blocks['uri_dynamic'] = {
  init: function() {
    this.jsonInit(uriDynamicJson);
  }
}

var restApiJson = {
  "type": "rest_api",
  "message0": "REST API %1 Resources: %2 URI Root: %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "RESOURCES",
      "check": "resource_definitions"
    },
    {
      "type": "input_statement",
      "name": "URI_ROOT",
      "check": "uri_root"
    }
  ],
  "inputsInline": false,
  "colour": 285,
  "tooltip": "A block that declares the REST API components.",
  "helpUrl": ""
}

Blockly.Blocks['rest_api'] = {
  init: function() {
    this.jsonInit(restApiJson);
  }
}