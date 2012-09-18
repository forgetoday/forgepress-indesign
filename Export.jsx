#targetengine "session"
#include "./Extendables/extendables.jsx"

if (!app.is('indesign')) {
	throw new EnvironmentError("This script only works in Adobe InDesign");
}

if (app.documents.length != 0){
//If the selection contains more than one item, the selection
//is not text selected with the Type tool.
if (app.selection.length == 1){
	//Evaluate the selection based on its type.
	switch (app.selection[0].constructor.name){
		case "InsertionPoint":
		case "Character":
		case "Word":
		case "TextStyleRange":
		case "Line":
		case "Paragraph":
		case "TextColumn":
		case "Text":
		case "Story":
			//The object is a text object; pass it on to a function.
			myProcessText(app.selection[0]);
		break;
			//In addition to checking for the above text objects, we can
			//also continue if the selection is a text frame selected with
			//the Selection tool or the Direct Selection tool.
		case "TextFrame":
			//If the selection is a text frame, get a reference to the
			//text in the text frame.
			myProcessText(app.selection[0].texts.item(0));
		break;
		default:
			alert("The selected object is not a text object. \
			Select some text and try again.");
		break;
		}
	}
	else{
		alert("Please select some text and try again.");
	}
}

function myProcessText( textNode ) {
    output = '';    
    
	if(textNode.textStyleRanges.length != 0){
        for(i = 0; i < textNode.textStyleRanges.length; i++){
           textStyleRange = textNode.textStyleRanges.item(i);
           contents = textStyleRange.contents;
           formatting = getFormatting(textStyleRange);
           
           if(formatting.bold){
               contents = contents.bold();
           }
       
           if(formatting.italic){
               contents = contents.italics();
           }
       
           output += contents;
        }
	}

    $.writeln(output);
}

function getFormatting( textStyleRange ) {
    formatting = {};
    fontStyle = textStyleRange.fontStyle;
    appliedFont = textStyleRange.appliedFont;
    
    if(appliedFont.is('Font')){
        appliedFont = appliedFont.fullNameNative;
    }
    
    if(fontStyle.contains('Bold') || appliedFont.contains('Demi')){
        formatting.bold = true;
    }
    
    if(fontStyle.contains('Italic')){
        formatting.italic = true;
    }
    
    return formatting;
}