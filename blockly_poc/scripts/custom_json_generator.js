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

customJSONGenerator['resource_linker'] = function(block) {
  // Get the name of the linker variable.
  var linkerID = block.getField("LINKER_VARIABLE");
  var json = '"' + linkerID.getText() + '"';
  return [json, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['resource_definition'] = function(block) {
  var resourceName = block.getFieldValue('RESOURCE_NAME');
  var resourceLinker = customJSONGenerator.valueToCode(block, 'RESOURCE_ID', customJSONGenerator.PRECEDENCE);
  var json = '{\n"resource_name" : "' + resourceName + '",\n' + '"resource_linker" : ' + resourceLinker + '\n}';
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
    json = '{\n"' + staticUriPath + '" : {\n"resource_linker" : ' + linkerID + ',\n'  + '"dynamic" : false,\n' + '"uri_paths" : [' + uriPaths + ']\n}\n}';
  }
  else {
    json = '{\n"' + staticUriPath + '" : {\n"resource_linker" : ' + linkerID + ',\n"dynamic" : false' + '\n}\n}';
  }
  return json;
};

customJSONGenerator['uri_dynamic'] = function(block) {
  var dynamicUriPath = block.getFieldValue('URI_DYNAMIC');
  var linkerID = customJSONGenerator.valueToCode(block, 'RESOURCE_LINKER', customJSONGenerator.PRECEDENCE);
  var uriPaths = customJSONGenerator.statementToCode(block, 'URI');
  var json;
  if (uriPaths) {
    json = '{\n"' + dynamicUriPath + '" : {\n"resource_linker" : ' + linkerID + ',\n' + '"dynamic" : true,\n' + '"uri_paths" : [' + uriPaths + ']\n}\n}';
  }
    else {
    json = '{\n"' + dynamicUriPath + '" : {\n"resource_linker" : ' + linkerID + ',\n"dynamic" : true' + '\n}\n}';
  }
  return json;
};

customJSONGenerator['rest_api'] = function(block) {
  var resources = customJSONGenerator.statementToCode(block, 'RESOURCES');
  var uri = customJSONGenerator.statementToCode(block, 'URI_ROOT');
  var code = '{\n' + '"resource_definitions" : ' + resources + ',\n' + '"uri" : ' + uri + '\n'  + '\n}';
  return code;
};
