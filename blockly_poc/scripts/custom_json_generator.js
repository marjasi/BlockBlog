function removeNewLinesFromString(string) {
  string = string.replace(/(\r\n|\n|\r)/gm, "");
  return string;
}

function addBackslashBeforeQuotes(string) {
  string = string.replace(/"/gm, '\\"');
  return string;
}

function removeCommaAfterMarkup(string) {
  string = string.replace(/>,/gm, '>');
  return string;
}

function formatHtmlData(htmlData) {
  htmlData = removeNewLinesFromString(htmlData);
  htmlData = addBackslashBeforeQuotes(htmlData);
  htmlData = removeCommaAfterMarkup(htmlData);
  return htmlData;
}

const customJSONGenerator = new Blockly.Generator("JSON");
customJSONGenerator.PRECEDENCE = 0;

// scrub_ is called from every block on blockToCode.
customJSONGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  if (nextBlock) {
    // Separate same object members with a comma and a newline.
    nextCode = opt_thisOnly ? '' : ',\n' + customJSONGenerator.blockToCode(nextBlock);
  }
  return code +  nextCode;
};

customJSONGenerator['header'] = function(block) {
  var text_header_name = block.getFieldValue('HEADER_NAME');
  var dropdown_level = block.getFieldValue('LEVEL');
  var text_text = block.getFieldValue('TEXT');
  var statements_children = customJSONGenerator.statementToCode(block, 'CHILDREN');
  text_text = removeNewLinesFromString(text_text);
  var json = '<h' + dropdown_level + ' id="' + text_header_name + '">' + text_text + '</h' + dropdown_level + '>' + statements_children;
  return json;
};

customJSONGenerator['paragraph'] = function(block) {
  var paragraphId = block.getFieldValue('PARAGRAPH_NAME');
  var textFormat = block.getFieldValue('FORMAT');
  var paragraphText = block.getFieldValue('TEXT');

  switch(textFormat) {
    case 'HTML':
      paragraphText = paragraphText;
      break;
    case 'Markdown':
      paragraphText = showdownConverter.makeHtml(paragraphText);
      break;
    case 'Text file':
      paragraphText = showdownConverter.makeHtml(paragraphText);
      break;
    default:
      paragraphText = paragraphText;
  }

  paragraphText = removeNewLinesFromString(paragraphText);
  var json = '<p id="' + paragraphId + '">' + paragraphText + '</p>';
  return json;
};

customJSONGenerator['image_property'] = function(block) {
  var text_image_name = block.getFieldValue('IMAGE_NAME');
  var value_image = customJSONGenerator.valueToCode(block, 'IMAGE', customJSONGenerator.PRECEDENCE);
  var statements_children = customJSONGenerator.statementToCode(block, 'CHILDREN');
  var json = '';
  return json;
};

customJSONGenerator['image'] = function(block) {
  var imageId = block.getFieldValue('IMAGE_NAME');
  var imageAlternativeText = block.getFieldValue('IMAGE_ALTERNATIVE_TEXT');
  var imageWidth = block.getFieldValue('IMAGE_WIDTH');
  var imageHeight = block.getFieldValue('IMAGE_HEIGHT');
  var imageSource = customJSONGenerator.valueToCode(block, 'SOURCE', customJSONGenerator.PRECEDENCE);
  var htmlData = '<img id="' + imageId + '" alt="' + imageAlternativeText + '" src="' + imageSource + '"';
  htmlData += 'width="' + imageWidth + '" height="' + imageHeight + '"';
  return htmlData;
};

customJSONGenerator['image_source'] = function(block) {
  var imageSource = block.getFieldValue('SOURCE');
  return [imageSource, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['link'] = function(block) {
  var text_link_name = block.getFieldValue('LINK_NAME');
  var text_text = block.getFieldValue('TEXT');
  var value_page_link = customJSONGenerator.valueToCode(block, 'PAGE_LINK', customJSONGenerator.PRECEDENCE);
  var htmlData = '<a id="' + text_link_name + '" href="' + value_page_link + '">' + text_text + '</a>';
  return htmlData;
};

customJSONGenerator['page'] = function(block) {
  var text_page_name = block.getFieldValue('PAGE_NAME');
  var statements_properties = customJSONGenerator.statementToCode(block, 'PROPERTIES');
  var htmlData = '<!DOCTYPE html><html><head><title>' + text_page_name + '</title></head><body>'
      + statements_properties + '</body></html>';
  htmlData = formatHtmlData(htmlData);
  var json = '{\n"page_name" : "' + text_page_name + '",\n "html_data" : "' + htmlData + '"\n}END';
  return json;
};

customJSONGenerator['page_link'] = function(block) {
  var text_page_name = block.getFieldValue('PAGE_NAME');
  var htmlData = text_page_name + '.html';
  return [htmlData, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['page_reference'] = function(block) {
  var text_page_name = block.getFieldValue('PAGE_NAME');
  var json = '{\n "page_reference" : "' + text_page_name + '"\n}';
  return json;
};

customJSONGenerator['url'] = function(block) {
  var urlPath = block.getFieldValue('URL_PATH');
  var urlPaths = customJSONGenerator.statementToCode(block, 'URL');
  var json;
  if (urlPaths) {
    json = '{\n"path" : {\n"url_path": "' + urlPath + '",\n' + '"url_paths" : [' + urlPaths + ']\n}\n}';
  }
  else {
    json = '{\n"path" : {\n"url_path": "' + urlPath + '\n}\n}';
  }
  return json;
};

customJSONGenerator['url_root'] = function(block) {
  var urlRootPath = block.getFieldValue('URL_ROOT');
  var urlPaths = customJSONGenerator.statementToCode(block, 'URL');
  var json = '{\n "url_root" : {\n "root_path" : "' + urlRootPath + '",\n' + '"url_paths" : [' + urlPaths + ']\n}\n}';
  return json;
};

customJSONGenerator['rest_api'] = function(block) {
  var url = customJSONGenerator.statementToCode(block, 'URL_ROOT');
  var json = '{\n' + '"url_schema" : ' + url + '\n}END';
  return json;
};

customJSONGenerator['button'] = function(block) {
  var buttonId = block.getFieldValue('BUTTON_NAME');
  var buttonText = block.getFieldValue('BUTTON_TEXT');
  var buttonAction = block.getFieldValue('BUTTON_ACTION');
  var htmlData = '<button id="' + buttonId + '" onclick="' + buttonAction + '">' + buttonText + '</button>';
  return htmlData;
};

customJSONGenerator['input_field'] = function(block) {
  var inputId = block.getFieldValue('INPUT_NAME');
  var input_text = block.getFieldValue('INPUT_TEXT');
  var labelText = customJSONGenerator.valueToCode(block, 'LABEL', customJSONGenerator.PRECEDENCE);
  var htmlData = '<label for="' + inputId + '">' + labelText + '</label>';
  htmlData += '<input type="text" id="' + inputId + '" value="' + input_text + '">';
  return htmlData;
};

customJSONGenerator['input_label'] = function(block) {
  var text_label_text = block.getFieldValue('LABEL_TEXT');
  return [text_label_text, customJSONGenerator.PRECEDENCE];
};

customJSONGenerator['empty_line'] = function(block) {
  var htmlData = '<br><br>'
  return htmlData;
};