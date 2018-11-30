import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import {mutateColor} from './colorUtil'
import {
  mutateBorderColor,
  mutateBorderThickness,
  mutateShadow
} from './styleUtil'
import {mutateCornerRadius} from './shapeUtil'


let browserWindow;
// documentation: https://developer.sketchapp.com/reference/api/

function duplicateNewLayers(obj, selectedProperties, numberOfLayers){
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    tmpObj.frame.y = tmpObj.frame.y + (i+1)*tmpObj.frame.height*2
    tmpObj.name = tmpObj.name + "." + i
    if(selectedProperties.radious){
      mutateCornerRadius(tmpObj)
    }
    if(selectedProperties.fillsColor){
      let color = mutateColor(tmpObj.style.fills[0].color)
      tmpObj.style.fills[0].color = color
    }
    if(selectedProperties.bordersColor){
      mutateBorderColor(tmpObj)
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

function createNewArtboard(){
  let newArtboard = new sketch.Artboard({
    name: "newArtboard",
    parent: sketch.getSelectedDocument().selectedPage
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

function duplicateOriginalLayerInNewArtboard(originalShape,parentArtboard){
  let tmpShape = originalShape.duplicate()
  tmpShape.parent = parentArtboard
  //TODO: Move to corrext origin etc.
  return tmpShape
}

function listenToMutationEvents(){
  
}

function playAroundWithArtboards(){
  browserWindow.webContents.on('webviewMessage', function(s){
    let selectedParameters = JSON.parse(s)
    let document = sketch.getSelectedDocument()
    console.log(document)
    let selectedLayers = document.selectedLayers
    
    
  if(!selectedLayers.isEmpty){
    
    let groupedLayer = selectedLayers.layers.filter(layer => layer.type === 'Group')
    if(groupedLayer.length > 0){
      console.log("Grouped Layer")
      console.log(groupedLayer)
      let shape = groupedLayer[0].layers.filter(layer => layer.type === 'ShapePath')
      console.log(shape.length)
      duplicateNewLayers(shape[0],selectedParameters, 8)
    } else {
      console.log("Not a grouped Layer")
      let shape = selectedLayers.layers[0]
      if (shape.type === 'ShapePath'){
        let parentArtboard = createNewArtboard()
        let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(shape,parentArtboard)
        //duplicateNewLayers(originalShapeInNewArtboard,selectedParameters, 8)
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
  //listenToMutationEvents()
  //playAroundWithArtboards()
}
