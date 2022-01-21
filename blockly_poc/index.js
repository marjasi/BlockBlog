// Initialize the Blockly workspace.
var blockWorkspace = Blockly.inject('blocklyDiv',
    {media: 'https://unpkg.com/blockly/media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), blockWorkspace);
var blogTemplate = '<!DOCTYPE html> <html> <title>Preview</title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"> <style> body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif} </style> <body class="w3-light-grey"> <!-- w3-content defines a container for fixed size centered content, and is wrapped around the whole page content, except for the footer in this example --> <div class="w3-content" style="max-width:1400px"> <!-- Header --> <header class="w3-container w3-center w3-padding-32"> <h1><b>MY READING BLOG</b></h1> </header> <!-- Grid --> <div class="w3-row"> <!-- Blog entries --> <div class="w3-col l8 s12"> <!-- Blog entry --> <div class="w3-card-4 w3-margin w3-white"> <div class="w3-container"> <div class="blogTitle"> <h5><span class="w3-opacity">January 24, 2022</span></h5> </div> </div> <div class="w3-container"> <div class="blogText"> <div class="w3-row"> <div class="w3-col m4 w3-hide-small"> <p><span class="w3-padding-large w3-right"><b>Comments </b> <span class="w3-tag">2</span></span></p> </div> </div> </div> </div> </div> <hr> <!-- END BLOG ENTRIES --> </div> <!-- Introduction menu --> <div class="w3-col l4"> <!-- About Card --> <div class="w3-card w3-margin w3-margin-top"> <img src="img/john.jfif" style="width:100%"> <div class="w3-container w3-white"> <h4><b>John</b></h4> <p>Reading books and exploring the creative worlds of many authors one step at a time.</p> </div> </div><hr> <!-- Posts --> <div class="w3-card w3-margin"> <div class="w3-container w3-padding"> <h4>Popular Posts</h4> </div> <ul class="w3-ul w3-hoverable w3-white"> <li class="w3-padding-16"> <!-- <img src="/w3images/workshop.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px"> --> <span class="w3-large">Welcome to my blog!</span><br> <span>Reading quickly</span> </li> <li class="w3-padding-16"> <span class="w3-large">What to read?</span><br> <span>Tips on finding good books</span> </li> <li class="w3-padding-16"> <span class="w3-large">About</span><br> <span>More about this blog</span> </li> <li class="w3-padding-16 w3-hide-medium w3-hide-small"> <span class="w3-large">Divine Comedy</span><br> <span>The real classic!</span> </li> </ul> </div> <hr> <!-- Labels / tags --> <div class="w3-card w3-margin"> <div class="w3-container w3-padding"> <h4>Tags</h4> </div> <div class="w3-container w3-white"> <p> <span class="w3-tag w3-black w3-margin-bottom">Reading</span> <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Books</span> </p> </div> </div> <!-- END Introduction Menu --> </div> <!-- END GRID --> </div><br> <!-- END w3-content --> </div> <!-- Footer --> <footer class="w3-container w3-dark-grey w3-padding-32 w3-margin-top"> <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p> </footer> </body> </html>';
var htmlFileArray = [];

function updateHtmlFileArray(jsonData) {
  var i = 0;
  for (var jsonElement of jsonData) {
    if (jsonElement.page_name) {
      htmlFileArray[i] = jsonElement.html_data;
      i = i + 1;
    }
  }
}

function formatWorkspaceJsonData(workspaceJsonData){
  workspaceJsonData = '[\n' + workspaceJsonData + '\n]';
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n{/gm, '},\n{');
  workspaceJsonData = workspaceJsonData.replace(/}END\r?\n]/gm, '}\n]');
  return workspaceJsonData;
}

function createDownloadFile(fileName, fileContent, fileType) {
  const blobFile = new Blob([fileContent], {type: fileType});
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blobFile, {oneTimeOnly: true});
  element.download = fileName;
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function createJSONData() {
  var json = customJSONGenerator.workspaceToCode(blockWorkspace);
  return formatWorkspaceJsonData(json);
}

function showJSON() {
  // Generate JSON code and display it.
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = createJSONData();
  alert(json);
}

function downloadJSON() {
  // Generate JSON code and save it to a file for the user to download.
  jsonFileName = "blocklyREST";
  jsonFileType = "application/json"
  window.LoopTrap = 1000;
  customJSONGenerator.INFINITE_LOOP_TRAP = null;
  var json = createJSONData();
  try {
    createDownloadFile(jsonFileName, json, jsonFileType);
  } catch(error) {
    alert("Failed to create JSON file for download.\n" + error)
    console.log(error);
  }
}

function updateBlogHtmlFiles() {
  var json = createJSONData();
  const blocklyJsondata = JSON.parse(json);
  updateHtmlFileArray(blocklyJsondata);
}

function createBlogPreview() {
  var htmlPreviewData = blogTemplate;
  updateBlogHtmlFiles();
  previewWindow = window.open();
  previewWindow.document.write(htmlPreviewData);
}
