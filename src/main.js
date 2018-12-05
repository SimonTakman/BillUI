import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import {mutateColor} from './colorUtil'
import {
  mutateBorderColor,
  mutateBorderThickness,
  mutateShadow
} from './styleUtil'
import {mutateCornerRadius} from './shapeUtil'

const amountCopies = 8
const yOffset = 16
const xOffset = 15

let browserWindow;
// documentation: https://developer.sketchapp.com/reference/api/

function duplicateNewLayers(obj, selectedProperties, numberOfLayers, mutationFrame){
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    //ADD EXTRA STARTINGPOINT
    //tmpObj.frame.y = tmpObj.frame.y + (i+1)*(tmpObj.frame.height+yOffset)
    tmpObj.frame.y = mutationFrame.y + mutationFrame.height + yOffset + (i)*(tmpObj.frame.height + yOffset)
    tmpObj.name = tmpObj.name + "." + i
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
  let newX = artboardFrame.width + artboardFrame.x + 50
  let newY = artboardFrame.y
  let newWidth = shapeFrame.width + 30
  let newHeight = (shapeFrame.height * (amountCopies+1)) +  (yOffset * (amountCopies+2))
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
  console.log('Inside addDescrption')
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


  if(!selectedLayers.isEmpty){

    let groupedLayer = selectedLayers.layers.filter(layer => layer.type === 'Group')
    if(groupedLayer.length > 0){
      console.log("Grouped Layer")
      console.log(groupedLayer)
      let shape = groupedLayer[0].layers.filter(layer => layer.type === 'ShapePath')
      console.log(shape.length)
      duplicateNewLayers(shape[0],selectedParameters, amountCopies)
    } else {
      console.log("Not a grouped Layer")
      let shape = selectedLayers.layers[0]
      if (shape.type === 'ShapePath'){
        let artboardFrameProperties = shape.parent.frame
        let parentArtboard = createNewArtboard(artboardFrameProperties, shape.frame, shape.name)
        let originalText = addDescrption(parentArtboard, 'Original', xOffset, yOffset)
        let mutationText = addDescrption(parentArtboard, 'Mutation', xOffset, shape.frame.height + (3 * yOffset) + originalText.frame.height)
        parentArtboard.frame.height = parentArtboard.frame.height + originalText.frame.height + mutationText.frame.height + (3 * yOffset)
        let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(shape, parentArtboard, originalText)
        duplicateNewLayers(originalShapeInNewArtboard,selectedParameters, amountCopies, mutationText.frame)
      }
    }
    //let shape = selectedLayers.layers[0]
    //duplicateNewLayers(shape,8)
  } else {
    sketch.UI.message("BillUI: No selected layer. Select a layer in order to mutate")
  }
  })
}

//This is our main function that triggers when we start the file
export default function() {
  initiateGUI()
  listenToMutationEvents()
}
