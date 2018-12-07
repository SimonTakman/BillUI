import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import {mutateColor} from './colorUtil'
import {
  mutateBorderColor,
  mutateBorderThickness,
  mutateShadow
} from './styleUtil'
import {mutateCornerRadius} from './shapeUtil'
import {getGroups, getShapePaths} from './layerUtil'

//TODO: Move this to to constants.
const amountCopies = 8
const yOffset = 16
const xOffset = 15

let browserWindow;
// documentation: https://developer.sketchapp.com/reference/api/
// Action api: https://github.com/bomberstudios/sketch-action-api-tester


function duplicateNewLayers(obj, selectedProperties, numberOfLayers, mutationFrame){
  
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    if (tmpObj.type === "Group") {
      let shapedLayers = tmpObj.layers.filter(layer => layer.type === "ShapePath")
      let textLayers = tmpObj.layers.filter(layer => layer.type === "Text")
      if(shapedLayers.length > 0) {
        tmpObj.frame.y = mutationFrame.y + mutationFrame.height + yOffset + (i)*(tmpObj.frame.height + yOffset)
        console.log(tmpObj.frame.y)
        tmpObj.name = tmpObj.name + "." + i
        if(textLayers.length > 0){
          //This only works for centered text on a rectangle
          textLayers[0].frame.y = shapedLayers[0].frame.y + (shapedLayers[0].frame.height / 2) - (textLayers[0].frame.height / 2)
        }
        tmpObj = shapedLayers[0]
      }
    } else {
      tmpObj.frame.y = mutationFrame.y + mutationFrame.height + yOffset + (i)*(tmpObj.frame.height + yOffset)
      tmpObj.name = tmpObj.name + "." + i
    }

    if(selectedProperties.radious){
      mutateCornerRadius(tmpObj)
    }
    if(selectedProperties.fillsColor){
      mutateColor(tmpObj.style.fills[0])
    }
    if(selectedProperties.bordersColor){
      mutateBorderColor(tmpObj.style.borders[0])
    }
    if(selectedProperties.borderWidth){
      mutateBorderThickness(tmpObj)
    }
    if(selectedProperties.shadow){
      mutateShadow(tmpObj)
    }
  }
}

//https://github.com/delighted/sketch-duplicate-to-new-artboard/blob/master/src/sketch-duplicate-to-new-artboard.js

function createNewArtboard(artboardFrame, shapeFrame, shapeName){
  //TODO: Update offsets
  let newX = artboardFrame.width + artboardFrame.x + 50
  let newY = artboardFrame.y
  let newWidth = shapeFrame.width + 30
  let newHeight = (shapeFrame.height * (amountCopies+1)) +  (yOffset * (amountCopies+2))
  //TODO: Think of what name it should have
  let newArtboard = new sketch.Artboard({
    name: "iterationOf."+shapeName,
    parent: sketch.getSelectedDocument().selectedPage,
    frame: new sketch.Rectangle(newX, newY, newWidth, newHeight)
  })
  return newArtboard
}


function initiateGUI(){
  //https://github.com/skpm/sketch-module-web-view/blob/master/docs/browser-window.md
  // Class Browserwindow
  const options = {
    identifier: 'Bill-UI',
    alwaysOnTop: true,
    width: 240,
    height: 400,
    backgroundColor: "#F2F2F2",
  }
  browserWindow = new BrowserWindow(options)
  browserWindow.loadURL(require('./webview/main-screen.html'))

  //In order to update GUI, use the method below
  //browserWindow.webContents.executeJavaScript('globalFunction("Yolo")')
}

function duplicateOriginalLayerInNewArtboard(originalShape,parentArtboard, header){
  let tmpShape = originalShape.duplicate()
  tmpShape.parent = parentArtboard
  tmpShape.frame.y = (yOffset * 2) + header.frame.height
  tmpShape.frame.x = (parentArtboard.frame.width - tmpShape.frame.width)/2
  return tmpShape
}

function addDescrption(parentArtboard, text, cordX, cordY) {
  let myText = new sketch.Text({
    text: text
  })
  //text.font = Roboto
  myText.parent = parentArtboard
  myText.systemFontSize = 14
  myText.frame.x = cordX
  myText.frame.y = cordY
  myText.style.opacity = 0.7
  return myText
}


function listenToMutationEvents(){

  browserWindow.webContents.on('webviewMessage', function(s){
    let selectedParameters = JSON.parse(s)
    let document = sketch.getSelectedDocument()
    let selectedLayers = document.selectedLayers
      if(!selectedLayers.isEmpty) {
        //TODO: See if this is the correct approach or not
        let layers = getShape(selectedLayers)
        if(layers !== null){
          let artboardProperties = createArtboardTemplate(layers.layers[0])
          let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(layers.layers[0], artboardProperties.parentArtboard, artboardProperties.originalText)
          duplicateNewLayers(originalShapeInNewArtboard, selectedParameters, amountCopies, artboardProperties.mutationText.frame)
        } else {
          sketch.UI.message("No layers found")
        }
      } else {
        sketch.UI.message("BillUI: No selected layer. Select a layer in order to mutate")
      }
  })
}

function getShape(selectedLayers){
  let layers = getGroups(selectedLayers.layers) 
  if (layers.length > 0){
    //THIS IS A GROUP
    return {"layers": layers, "type": layers[0].type}
  } else {
    layers = getShapePaths(selectedLayers.layers)
    if(layers.length > 0){
      return {"layers": layers, "type": layers[0].type}
      // THIS IS A SHAPEPATH
      //sketch.UI.message("This is a shapepath")
    }
  } 
  return null
}

function createArtboardTemplate(obj){
  let artboardFrameProperties = obj.parent.frame
  let parentArtboard = createNewArtboard(artboardFrameProperties, obj.frame, obj.name)
  let originalText = addDescrption(parentArtboard, 'Original', xOffset, yOffset)
  let mutationText = addDescrption(parentArtboard, 'Mutation', xOffset, obj.frame.height + (3 * yOffset) + originalText.frame.height)
  parentArtboard.frame.height = parentArtboard.frame.height + originalText.frame.height + mutationText.frame.height + (3 * yOffset)
  return {"parentArtboard": parentArtboard, "originalText": originalText, "mutationText": mutationText}
}

function todoMoveThisIntoSomethingLater(){
  
  let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(shape, parentArtboard, originalText)
}

//This is our main function that triggers when we start the file
export default function() {
  initiateGUI()
  listenToMutationEvents()
}
