import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import {mutateColor} from './colorUtil'
import {
  mutateBorderColor,
  mutateBorderThickness,
  mutateShadow
} from './styleUtil'

// documentation: https://developer.sketchapp.com/reference/api/

function duplicateNewLayers(obj, numberOfLayers){
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    tmpObj.frame.y = tmpObj.frame.y + (i+1)*tmpObj.frame.height*2
    tmpObj.name = tmpObj.name + "." + i
    let color = mutateColor(tmpObj.style.fills[0].color)
    tmpObj.style.fills[0].color = color
    mutateBorderColor(tmpObj)
    mutateBorderThickness(tmpObj)
    mutateShadow(tmpObj)
    let tmpNativeObj = tmpObj.sketchObject
    tmpNativeObj.setCornerRadiusFloat(Math.floor(Math.random() * 30))
  }
}

function initiateGUI(){
  const options = {
    identifier: 'Bill-UI',
  }
  const browserWindow = new BrowserWindow(options)
  browserWindow.loadURL(require('./webview/main-screen.html'))
}

//This is our main function that triggers when we start the file
export default function() {
  /*
  let document = sketch.getSelectedDocument()
  let selectedLayers = document.selectedLayers
  if(!selectedLayers.isEmpty){
    let groupedLayer = selectedLayers.layers.filter(layer => layer.type === 'Group')
    if(groupedLayer.length > 0){
      console.log("Grouped Layer")
      console.log(groupedLayer)
      let shape = groupedLayer[0].layers.filter(layer => layer.type === 'ShapePath')
      console.log(shape.length)
      duplicateNewLayers(shape[0], 8)
    } else {
      console.log("Not a grouped Layer")
      let shape = selectedLayers.layers[0]
      if (shape.type === 'ShapePath'){
        duplicateNewLayers(shape, 8)
      }
    }
    //let shape = selectedLayers.layers[0]
    //duplicateNewLayers(shape,8)
  } else {
    console.log("Whaat")
  }
  */
  initiateGUI()
  //console.log(sketch.UI)
  sketch.UI.message("It's bow  🙌")
}
