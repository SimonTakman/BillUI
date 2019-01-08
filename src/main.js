import sketch from 'sketch'
import swap from './swap'
import {mutateWithParameters} from './mutate'
import BrowserWindow from 'sketch-module-web-view'
import {mutateColor} from './colorUtil'
import {
  mutateBorderColor,
  mutateBorderThickness,
  mutateShadow
} from './styleUtil'
import {mutateCornerRadius} from './shapeUtil'
import {
  getGroups,
  getShapePaths,
  getText,
  hasTextElementByValue,
  sortTextDescendingOrder} from './layerUtil'
import {
  AMOUNT_COPIES,
  X_OFFSET,
  Y_OFFSET
} from './constants'

let browserWindow
// documentation: https://developer.sketchapp.com/reference/api/
// Action api: https://github.com/bomberstudios/sketch-action-api-tester
// Action example: https://github.com/BohemianCoding/SketchAPI/blob/develop/examples/selection-changed/src/selection-changed.js


export function duplicateNewLayers(obj, selectedProperties, numberOfLayers, mutationFrame){
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    if (tmpObj.type === "Group") {
      let shapedLayers = tmpObj.layers.filter(layer => layer.type === "ShapePath")
      let textLayers = tmpObj.layers.filter(layer => layer.type === "Text")
      if(shapedLayers.length > 0) {
        tmpObj.frame.y = mutationFrame.y + mutationFrame.height + Y_OFFSET + (i)*(tmpObj.frame.height + Y_OFFSET)
        tmpObj.name = tmpObj.name + "." + i
        if(textLayers.length > 0){
          //This only works for centered text on a rectangle
          textLayers[0].frame.y = shapedLayers[0].frame.y + (shapedLayers[0].frame.height / 2) - (textLayers[0].frame.height / 2)
        }
        tmpObj = shapedLayers[0]
      }
    } else {
      tmpObj.frame.y = mutationFrame.y + mutationFrame.height + Y_OFFSET + (i)*(tmpObj.frame.height + Y_OFFSET)
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
  let newHeight = (shapeFrame.height * (AMOUNT_COPIES+1)) + (Y_OFFSET * (AMOUNT_COPIES+2))
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

export function duplicateOriginalLayerInNewArtboard(originalShape,parentArtboard, header){
  let tmpShape = originalShape.duplicate()
  tmpShape.parent = parentArtboard
  tmpShape.frame.y = (Y_OFFSET * 2) + header.frame.height
  tmpShape.frame.x = (parentArtboard.frame.width - tmpShape.frame.width)/2
  return tmpShape
}

function addDescrption(parentArtboard, text, cordX, cordY, opacity, fontSize) {
  let myText = new sketch.Text({
    text: text
  })
  //text.font = Roboto
  myText.parent = parentArtboard
  myText.systemFontSize = fontSize
  myText.frame.x = cordX
  myText.frame.y = cordY
  myText.style.opacity = opacity
  return myText
}

function listenToSwapEvents(){
  browserWindow.webContents.on('swapMessage',function(){
    swap()
  })
}

function listenToMutationEvents(){
  browserWindow.webContents.on('mutateMessage', function(s){
    mutateWithParameters(JSON.parse(s))
  })
}

export function createArtboardTemplate(obj){
  let artboardFrameProperties = obj.parent.frame
  let parentArtboard = createNewArtboard(artboardFrameProperties, obj.frame, obj.name)
  let originalText = addDescrption(parentArtboard, 'Original', X_OFFSET, Y_OFFSET, 0.7, 14)
  if(getText(obj.parent.layers).length > 2 && hasTextElementByValue(obj.parent.layers, "Mutation")){
    let textLayers = getText(obj.parent.layers)
    let sortedTextLayer = sortTextDescendingOrder(textLayers)
    addDescrption(parentArtboard, sortedTextLayer[0].name, X_OFFSET, Y_OFFSET + 1 + originalText.frame.height, 0.2, 2)
  } else {
    addDescrption(parentArtboard, obj.id, X_OFFSET, Y_OFFSET + 1 + originalText.frame.height, 0.2, 2)
  }
  let mutationText = addDescrption(parentArtboard, 'Mutation', X_OFFSET, obj.frame.height + (3 * Y_OFFSET) + originalText.frame.height, 0.7, 14)
  parentArtboard.frame.height = parentArtboard.frame.height + originalText.frame.height + mutationText.frame.height + (3 * Y_OFFSET)
  return {"parentArtboard": parentArtboard, "originalText": originalText, "mutationText": mutationText}
}

function todoMoveThisIntoSomethingLater(){

  let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(shape, parentArtboard, originalText)
}

//This is our main function that triggers when we start the file
export default function() {
  initiateGUI()
  listenToMutationEvents()
  listenToSwapEvents()
}
