function removeNewLinesFromString(string){
  string = string.replace(/(\r\n|\n|\r)/gm, "");
  return string;
}

const customJSONGenerator = new Blockly.Generator("JSON");
customJSONGenerator.PRECEDENCE = 0;

// scrub_ is called from every block on blockToCode.
customJSONGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  if (nextBlock) {
    // Separate same object memebers with a comma and a newline.
    nextCode = opt_thisOnly ? '' : ',\n' + customJSONGenerator.blockToCode(nextBlock);
  }
  return code +  nextCode;
};

customJSONGenerator['header'] = function(block) {
  var text_header_name = block.getFieldValue('HEADER_NAME');
  var text_text = block.getFieldValue('TEXT');
  var statements_children = customJSONGenerator.statementToCode(block, 'CHILDREN');
  text_text = removeNewLinesFromString(text_text);
  var htmlData = '<h1 id=\\"' + text_header_name + '\\">' + text_text + '</h1>' + statements_children;
  return htmlData;
};

customJSONGenerator['paragraph'] = function(block) {
  var text_paragraph_name = block.getFieldValue('PARAGRAPH_NAME');
  var text_text = block.getFieldValue('TEXT');
  text_text = removeNewLinesFromString(text_text);
  var code = '<p id=\\"' + text_paragraph_name + '\\">' + text_text + '</p>';
  return code;
};

customJSONGenerator['image_property'] = function(block) {
  var text_image_name = block.getFieldValue('IMAGE_NAME');
  var value_image = customJSONGenerator.valueToCode(block, 'IMAGE', customJSONGenerator.PRECEDENCE);
  var statements_children = customJSONGenerator.statementToCode(block, 'CHILDREN');
  var code = '';
  return code;
};

customJSONGenerator['image'] = function(block) {
  var code = '';
  return [code, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['link'] = function(block) {
  var text_link_name = block.getFieldValue('LINK_NAME');
  var value_name = customJSONGenerator.valueToCode(block, 'NAME', customJSONGenerator.PRECEDENCE);
  var code = '';
  return code;
};

customJSONGenerator['content_type_link'] = function(block) {
  var text_content_type = block.getFieldValue('CONTENT_TYPE');
  var code = '';
  return [code, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['content_type_reference'] = function(block) {
  var text_content_type = block.getFieldValue('CONTENT_TYPE');
  var json = '{\n "content_type_reference" : "' + text_content_type + '"\n}';
  return json;
};

customJSONGenerator['content_type'] = function(block) {
  var text_content_type = block.getFieldValue('CONTENT_TYPE');
  var statements_properties = customJSONGenerator.statementToCode(block, 'PROPERTIES');
  var htmlData = '<!DOCTYPE html><html><head><title>' + text_content_type + '</title></head><body>'
      + statements_properties + '</body></html>';
  var json = '{\n"content_type" : "' + text_content_type + '",\n "html_data" : "' + htmlData + '"\n}END';
  return json;
};

customJSONGenerator['resource_linker'] = function(block) {
  // Get the name of the linker variable.
  var linkerID = block.getField("LINKER_VARIABLE");
  var json = linkerID.getText();
  return [json, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['resource_definition'] = function(block) {
  var resourceName = block.getFieldValue('RESOURCE_NAME');
  var resourceLinker = customJSONGenerator.valueToCode(block, 'RESOURCE_ID', customJSONGenerator.PRECEDENCE);
  var json = '{\n"resource_name" : "' + resourceName + '",\n' + '"resource_linker" : "' + resourceLinker + '"\n}';
  return json;
};

customJSONGenerator['resource_definitions'] = function(block) {
  var resources = customJSONGenerator.statementToCode(block, 'RESOURCES');
  var json = '{\n"resources" : [\n' + resources + '\n]\n}';
  return json;
};

customJSONGenerator['uri_root'] = function(block) {
  var uriRootPath = block.getFieldValue('URI_ROOT');
  var uriPaths = customJSONGenerator.statementToCode(block, 'URI');
  var json = '{\n "uri_root" : {\n "root_path" : "' + uriRootPath + '",\n' + '"uri_paths" : [' + uriPaths + ']\n}\n}';
  return json;
};

customJSONGenerator['uri_static'] = function(block) {
  var staticUriPath = block.getFieldValue('URI_STATIC');
  var linkerID = customJSONGenerator.valueToCode(block, 'RESOURCE_LINKER', customJSONGenerator.PRECEDENCE);
  var uriPaths = customJSONGenerator.statementToCode(block, 'URI');
  var json;
  if (uriPaths) {
    json = '{\n"path" : {\n"uri_path": "' + staticUriPath + '",\n' + '"resource_linker" : "' + linkerID + '",\n'
      + '"dynamic" : false,\n' + '"uri_paths" : [' + uriPaths + ']\n}\n}';
  }
  else {
    json = '{\n"path" : {\n"uri_path": "' + staticUriPath + '",\n' + '"resource_linker" : "' + linkerID + '",\n"dynamic" : false' + '\n}\n}';
  }
  return json;
};

customJSONGenerator['uri_dynamic'] = function(block) {
  var dynamicUriPath = block.getFieldValue('URI_DYNAMIC');
  var linkerID = customJSONGenerator.valueToCode(block, 'RESOURCE_LINKER', customJSONGenerator.PRECEDENCE);
  var uriPaths = customJSONGenerator.statementToCode(block, 'URI');
  var json;
  if (uriPaths) {
    json = '{\n"path" : {\n"uri_path": "' + dynamicUriPath + '",\n' + '"resource_linker" : "' + linkerID + '",\n'
      + '"dynamic" : true,\n' + '"uri_paths" : [' + uriPaths + ']\n}\n}';
  }
    else {
    json = '{\n"path" : {\n"uri_path": "' + dynamicUriPath + '",\n' + '"resource_linker" : "' + linkerID + '",\n"dynamic" : true' + '\n}\n}';
  }
  return json;
};

customJSONGenerator['rest_api'] = function(block) {
  var resources = customJSONGenerator.statementToCode(block, 'RESOURCES');
  var uri = customJSONGenerator.statementToCode(block, 'URI_ROOT');
  var code = '{\n' + '"resource_definitions" : ' + resources + ',\n' + '"uri" : ' + uri + '\n}END';
  return code;
};
