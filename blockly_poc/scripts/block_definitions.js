var headerJson = {
  "type": "header",
  "message0": "Header %1 Level %2 %3 Text %4 %5 %6",
  "args0": [
    {
      "type": "field_input",
      "name": "HEADER_NAME",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "LEVEL",
      "options": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CHILDREN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['header'] = {
  init: function() {
    this.jsonInit(headerJson);
  }
}

var paragraphJson = {
  "type": "paragraph",
  "message0": "Paragraph %1 %2 Text %3",
  "args0": [
    {
      "type": "field_input",
      "name": "PARAGRAPH_NAME",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_multilinetext",
      "name": "TEXT",
      "text": ""
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['paragraph'] = {
  init: function() {
    this.jsonInit(paragraphJson);
  }
}

var imagePropertyJson = {
  "type": "image_property",
  "message0": "Image %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "IMAGE_NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "IMAGE",
      "check": "image"
    },
    {
      "type": "input_statement",
      "name": "CHILDREN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['image_property'] = {
  init: function() {
    this.jsonInit(imagePropertyJson);
  }
}

var imageJson = {
  "type": "image",
  "message0": "%1",
  "args0": [
    {
      "type": "field_image",
      "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['image'] = {
  init: function() {
    this.jsonInit(imageJson);
  }
}

var linkJson = {
  "type": "link",
  "message0": "Link %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "LINK_NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['link'] = {
  init: function() {
    this.jsonInit(linkJson);
  }
}

var contentTypeLinkJson = {
  "type": "content_type_link",
  "message0": "Content Type %1",
  "args0": [
    {
      "type": "field_input",
      "name": "CONTENT_TYPE",
      "text": ""
    }
  ],
  "output": null,
  "colour": 75,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['content_type_link'] = {
  init: function() {
    this.jsonInit(contentTypeLinkJson);
  }
}

var contentTypeReferenceJson = {
  "type": "content_type_reference",
  "message0": "Content Type %1",
  "args0": [
    {
      "type": "field_input",
      "name": "CONTENT_TYPE",
      "text": ""
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 75,
  "tooltip": "The content type.",
  "helpUrl": ""
}

Blockly.Blocks['content_type_reference'] = {
  init: function() {
    this.jsonInit(contentTypeReferenceJson);
  }
}

var contentTypeJson = {
  "type": "content_type",
  "message0": "Content Type %1 %2 Properties: %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "CONTENT_TYPE",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "PROPERTIES"
    }
  ],
  "colour": 75,
  "tooltip": "The content type definition.",
  "helpUrl": ""
}

Blockly.Blocks['content_type'] = {
  init: function() {
    this.jsonInit(contentTypeJson);
  }
}

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
  "message0": "Resource Name %1 %2 Resource Linker %3",
  "args0": [
    {
      "type": "field_input",
      "name": "RESOURCE_NAME",
      "text": "Resource"
    },
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
