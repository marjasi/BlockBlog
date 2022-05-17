var blockWorkspace = Blockly.inject('blocklyDiv',
  {
    toolbox: document.getElementById('toolbox'),
    zoom:
    {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    trashcan: true,
    renderer: 'zelos'
  });

Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);

// TemplateStart + EntryStart + EntryDate + EntryBodyStart + EntryText + EntryEnd + TemplateEnd.
var blogTemplateStart = '<!DOCTYPE html> <html> <title>Preview</title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="css/w3.css"> <link rel="stylesheet" href="css/fontRaleway.css"> <style>body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}</style> <body class="w3-light-grey"> <!-- w3-content defines a container for fixed size centered content, and is wrapped around the whole page content, except for the footer in this example --> <div class="w3-content" style="max-width:1400px"> <!-- Header --> <header class="w3-container w3-center w3-padding-32"> <h1><b>MY READING BLOG</b></h1> </header> <!-- Grid --> <div class="w3-row"><!-- Blog entries --><div class="w3-col l8 s12">';
var blogTemplateEnd = '<!-- END BLOG ENTRIES --></div><!-- Introduction menu --> <div class="w3-col l4"> <!-- About Card --> <div class="w3-card w3-margin w3-margin-top"> <img src="img/ivySpencer.jfif" style="width:100%"> <div class="w3-container w3-white"> <h4><b>Ivy Spencer</b></h4> <p>Reading books and exploring the creative worlds of many authors one step at a time.</p> </div> </div><hr> <!-- Posts --> <div class="w3-card w3-margin"> <div class="w3-container w3-padding"> <h4>Popular Posts</h4> </div> <ul class="w3-ul w3-hoverable w3-white"> <li class="w3-padding-16"> <!-- <img src="/w3images/workshop.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px"> --> <span class="w3-large">Welcome to my blog!</span><br> <span>Reading quickly</span> </li> <li class="w3-padding-16"> <span class="w3-large">What to read?</span><br> <span>Tips on finding good books</span> </li> <li class="w3-padding-16"> <span class="w3-large">About</span><br> <span>More about this blog</span> </li> <li class="w3-padding-16 w3-hide-medium w3-hide-small"> <span class="w3-large">Divine Comedy</span><br> <span>The real classic!</span> </li> </ul> </div> <hr> <!-- Labels / tags --> <div class="w3-card w3-margin"> <div class="w3-container w3-padding"> <h4>Tags</h4> </div> <div class="w3-container w3-white"> <p> <span class="w3-tag w3-black w3-margin-bottom">Reading</span> <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Books</span> </p> </div> </div> <!-- END Introduction Menu --> </div> <!-- END GRID --> </div><br> <!-- END w3-content --> </div> <!-- Footer --> </body> </html>';
var blogEntryStart = ' <!-- Blog entry --><div class="w3-card-4 w3-margin w3-white"><div class="w3-container">';
var blogEntryDate = '<h5><span class="w3-opacity">January 24, 2022</span></h5></div>';
var blogEntryBodyStart = '<div class="w3-container">';
var blogEntryEnd = ' <div class="w3-row"> <div class="w3-col m8 s12"> <p><button class="w3-button w3-padding-large w3-white w3-border" style="display: none;"><b></b></button></p> </div> <div class="w3-col m4 w3-hide-small"> <p><span class="w3-padding-large w3-right"><b>Comments </b> <span class="w3-tag">2</span></span></p> </div> </div> </div> </div> <hr>';

var htmlFileArray = [];

var MAX_TEXT_LENGTH = 200;

var showdownConverter = new showdown.Converter();

var imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/*';

var textInput = document.createElement('input');
textInput.type = 'file';
textInput.accept = 'text/*';

//Updates html file array.
function updateHtmlFileArray(jsonData) {
  var i = 0;
  for (var jsonElement of jsonData) {
    if (jsonElement.page_name) {
      htmlFileArray[i] = jsonElement.html_data;
      i++;
    }
  }
}

//Formats json schema by replacing custom '}END' notations with appropriate formatting symbols.
function formatWorkspaceJsonData(workspaceJsonData) {
  workspaceJsonData = '[\n' + workspaceJsonData + '\n]';
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n{/gm, '},\n{');
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n]/gm, '}\n]');
  return workspaceJsonData;
}

//Creates a json schema file and makes it downloadable by the browser.
function createDownloadFile(fileName, fileContent, fileType) {
  const blobFile = new Blob([fileContent], { type: fileType });
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blobFile, { oneTimeOnly: true });
  element.download = fileName;
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//Initiates json schema generation and formats the generated json.
function createJSONData() {
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  return formatWorkspaceJsonData(json);
}

//Shows the generated json schema in an alert window.
function showJSON() {
  // Generate JSON code and display it.
  var json = createJSONData();
  alert(json);
}

//Initiates downloading of a generated json schema file.
function downloadJSON() {
  // Generate JSON code and save it to a file for the user to download.
  jsonFileName = "blocklyREST";
  jsonFileType = "application/json"
  window.LoopTrap = 1000;
  var json = createJSONData();
  try {
    createDownloadFile(jsonFileName, json, jsonFileType);
  } catch (error) {
    alert("Failed to create JSON file for download.\n" + error)
    console.log(error);
  }
}

//Updates the html file array based on new added pages.
function updateBlogHtmlFiles() {
  var json = createJSONData();
  const blocklyJsondata = JSON.parse(json);
  updateHtmlFileArray(blocklyJsondata);
}

//Adds blog entries to template html string.
function addBlogEntries(blogTemplate) {
  for (var blogpost of htmlFileArray) {
    blogTemplate += blogEntryStart;
    blogTemplate += blogEntryDate;
    blogTemplate += blogEntryBodyStart;
    blogTemplate += blogpost;
    blogTemplate += blogEntryEnd;
  }

  return blogTemplate;
}

//Creates the html file of the preview panel to the side of the Blockly window.
function createBlogMiniPreview() {
  var htmlPreviewData = '';
  htmlPreviewData += blogTemplateStart;
  updateBlogHtmlFiles();
  htmlPreviewData = addBlogEntries(htmlPreviewData);
  htmlPreviewData += blogTemplateEnd;
  document.getElementById('previewArea').innerHTML = htmlPreviewData;
}

//Creates the html file of the preview window.
function createBlogNewPagePreview() {
  var htmlPreviewData = '';
  htmlPreviewData += blogTemplateStart;
  updateBlogHtmlFiles();
  htmlPreviewData = addBlogEntries(htmlPreviewData);
  htmlPreviewData += blogTemplateEnd;
  previewWindow = window.open();
  previewWindow.document.write(htmlPreviewData);
}

//Opens the file selector and sets the value of a block field to the selected image file.
function setFieldValueToSelectedImage(blockField) {
  imageInput.onchange = () => {
    setEncodedImageValueInField(imageInput, blockField);
    imageInput.value = null;
  }
  imageInput.click();
}

//Sets the base 64 encoded value in the passed field.
function setEncodedImageValueInField(fileInput, blockField) {
  var imageFile = fileInput.files[0];
  var reader = new FileReader();

  if (imageFile) {
    reader.readAsDataURL(imageFile);
    reader.onload = (readerEvent) => {
      var encodedImage = readerEvent.target.result;
      blockField.setValue(encodedImage);
    }
  }
}

//Converts formats when selecting different dropdown options in the paragraph block.
function convertParagraphFormats(selectedFormat, paragraphTextField, textFileSelectionField) {
  switch (selectedFormat) {
    case 'HTML':
      textFileSelectionField.setVisible(false);
      paragraphTextField.setValue(showdownConverter.makeHtml(paragraphTextField.getValue()));
      paragraphTextField.setVisible(true);
      break;
    case 'Markdown':
      textFileSelectionField.setVisible(false);
      paragraphTextField.setValue(showdownConverter.makeMarkdown(paragraphTextField.getValue()));
      paragraphTextField.setVisible(true);
      break;
    case 'Text file':
      paragraphTextField.setVisible(false);
      textFileSelectionField.setVisible(true);
      break;
    default:
      paragraphTextField.setValue('');
      textFileSelectionField.setValue('');
  }
}

//Opens the file selector and sets the value of a block field to the selected text file in a way to not cause lag.
function saveTextFromFileInField(blockField) {
  textInput.onchange = () => {
    readTextFromSelectedFile(textInput, blockField);
    textInput.value = null;
  }
  textInput.click();
}

//Reads and returns text from a selected file.
function readTextFromSelectedFile(fileInput, blockField) {
  var textFile = fileInput.files[0];
  var reader = new FileReader();

  if (textFile) {
    reader.readAsText(textFile);
    reader.onload = (readerEvent) => {
      blockField.setValue(readerEvent.target.result.slice(0, MAX_TEXT_LENGTH) + '...');
      blockField.value_ = readerEvent.target.result;
    }
  }
}
