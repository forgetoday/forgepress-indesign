if (app.documents.length == 0) { 
  alert("There are no open documents."); 
  exit(); 
} 
myDoc = app.activeDocument;
myOsetList = myDoc.stories.everyItem().overflows;

for (j = 0; myOsetList.length > j; j++) { 
  if (myOsetList) { 
  // j-th story is overset; tell the user and exit 
  selectIt(myDoc.stories.textFrames[-1]); 
  exit(); 
  }
} 
alert("No stories are overset");

function selectIt(theObj) { 
  // Selects object, turns to page and zooms in on it 
  app.select(theObj,SelectionOptions.replaceWith); 
  app.activeWindow.zoom = ZoomOptions.fitPage; 
  app.activeWindow.zoomPercentage = 200 
}