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
  "colour": 215,
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
  "message0": "Paragraph %1 %2 Format %3 %4 Text %5",
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
      "type": "field_dropdown",
      "name": "FORMAT",
      "options": [
        [
          "HTML",
          "HTML"
        ],
        [
          "Markdown",
          "Markdown"
        ],
        [
          "Text file",
          "Text file"
        ]
      ]
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
  "colour": 215,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['paragraph'] = {
  init: function() {
    this.jsonInit(paragraphJson);

    var formatField = this.getField('FORMAT');
    var paragraphTextField = this.getField('TEXT');
    
    var conversionFormatValidator = (selectedFormat) => {
      //If the validator is a local validator, 'this' refers to the block not the field.
      //Blockly documentation doesn't provide insight about the value of 'this' in local validators.
      convertParagraphFormats(selectedFormat, paragraphTextField);
    }

    //Add conversion validator to dropdown field.
    formatField.setValidator(conversionFormatValidator);
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
  "colour": 215,
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
  "message0": "Image %1 %2 Alternative Text %3 %4 Width %5 %6 Height %7 %8 Source %9",
  "args0": [
    {
      "type": "field_input",
      "name": "IMAGE_NAME",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "IMAGE_ALTERNATIVE_TEXT",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "IMAGE_WIDTH",
      "value": 0,
      "min": 1
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "IMAGE_HEIGHT",
      "value": 0,
      "min": 1
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": "image_source"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['image'] = {
  init: function() {
    this.jsonInit(imageJson);
  }
}

var imageSourceJson = {
  "type": "image_source",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "SOURCE",
      "text": "Select Image File..."
    }
  ],
  "output": null,
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['image_source'] = {
  init: function() {
    this.jsonInit(imageSourceJson);
    //Add input listener.
    var textField =  this.getField('SOURCE');
    textField.showEditor_ = () => {
      setFieldValueToSelectedImage(textField);
    }
  }
}

var linkJson = {
  "type": "link",
  "message0": "Link %1 Ref Text %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "LINK_NAME",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PAGE_LINK"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 215,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['link'] = {
  init: function() {
    this.jsonInit(linkJson);
  }
}

var pageJson = {
  "type": "page",
  "message0": "Page %1 %2 Blocks: %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "PAGE_NAME",
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
  "colour": 230,
  "tooltip": "The page content type definition.",
  "helpUrl": ""
}

Blockly.Blocks['page'] = {
  init: function() {
    this.jsonInit(pageJson);
  }
}

var pageLinkJson = {
  "type": "page_link",
  "message0": "Page %1",
  "args0": [
    {
      "type": "field_input",
      "name": "PAGE_NAME",
      "text": ""
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['page_link'] = {
  init: function() {
    this.jsonInit(pageLinkJson);
  }
}

var pageReferenceJson = {
  "type": "page_reference",
  "message0": "Page %1",
  "args0": [
    {
      "type": "field_input",
      "name": "PAGE_NAME",
      "text": ""
    }
  ],
  "previousStatement": null,
  "colour": 230,
  "tooltip": "Reference to a page.",
  "helpUrl": ""
}

Blockly.Blocks['page_reference'] = {
  init: function() {
    this.jsonInit(pageReferenceJson);
  }
}

var urlJson = {
  "type": "url",
  "message0": "URL %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "URL_PATH",
      "text": "URL Path"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "URL",
      "check": "url"
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "url",
    "url_root"
  ],
  "nextStatement": "url",
  "colour": 310,
  "tooltip": "A block that defines a part of the URL schema.",
  "helpUrl": ""
}

Blockly.Blocks['url'] = {
  init: function() {
    this.jsonInit(urlJson);
  }
}

var urlRootJson = {
  "type": "url_root",
  "message0": "URL Root %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "URL_ROOT",
      "text": "URL Path"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "URL",
      "check": "url"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "colour": 330,
  "tooltip": "This block defines the URL scheme's root address.",
  "helpUrl": ""
}

Blockly.Blocks['url_root'] = {
  init: function() {
    this.jsonInit(urlRootJson);
  }
}

var restApiJson = {
  "type": "rest_api",
  "message0": "REST API %1 URL Hierarchy: %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "URL_ROOT",
      "check": "url_root"
    }
  ],
  "inputsInline": false,
  "colour": 0,
  "tooltip": "A block that declares the REST API components.",
  "helpUrl": ""
}

Blockly.Blocks['rest_api'] = {
  init: function() {
    this.jsonInit(restApiJson);
  }
}

var buttonJson = {
  "type": "button",
  "message0": "Button %1 %2 Text %3 Action %4",
  "args0": [
    {
      "type": "field_input",
      "name": "BUTTON_NAME",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "BUTTON_TEXT",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "BUTTON_ACTION",
      "text": ""
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['button'] = {
  init: function() {
    this.jsonInit(buttonJson);
  }
}

var inputFieldJson = {
  "type": "input_field",
  "message0": "Input %1 %2 Input text %3 %4 Label %5",
  "args0": [
    {
      "type": "field_input",
      "name": "INPUT_NAME",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "INPUT_TEXT",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "LABEL",
      "check": "input_label"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['input_field'] = {
  init: function() {
    this.jsonInit(inputFieldJson);
  }
}

var inputLabelJson = {
  "type": "input_label",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "LABEL_TEXT",
      "text": "Label"
    }
  ],
  "output": null,
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['input_label'] = {
  init: function() {
    this.jsonInit(inputLabelJson);
  }
}

var emptyLineJson = {
  "type": "empty_line",
  "message0": "Empty line",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
}

Blockly.Blocks['empty_line'] = {
  init: function() {
    this.jsonInit(emptyLineJson);
  }
}
