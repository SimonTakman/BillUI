import sketch from 'sketch'
import {mutateColor} from './colorUtil'
// documentation: https://developer.sketchapp.com/reference/api/

function duplicateNewLayers(obj, numberOfLayers){
  for(let i = 0; i < numberOfLayers; i++){
    let tmpObj = obj.duplicate()
    tmpObj.frame.y = tmpObj.frame.y + (i+1)*tmpObj.frame.height*2
    tmpObj.name = tmpObj.name + "." + i
    let color = mutateColor(tmpObj.style.fills[0].color)
    tmpObj.style.fills[0].color = color
    let tmpNativeObj = tmpObj.sketchObject
    tmpNativeObj.setCornerRadiusFloat(Math.floor(Math.random() * 30))
  }
}

//This is our main function that triggers when we start the file
export default function() {
  let document = sketch.getSelectedDocument()
  let selectedLayers = document.selectedLayers
  if(!selectedLayers.isEmpty){
    let shape = selectedLayers.layers[0]
    duplicateNewLayers(shape,8)
  }
  //console.log(selectedLayers.layers)
  //let shape = document.getLayersNamed("Rectangle")[0]
  //createEightNewLayers(shape)
  //console.log(sketchObject)
  // Move this function to shape
  sketch.UI.message("It's wow  🙌")
}
