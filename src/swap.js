import sketch from 'sketch'
import {
  getShapePaths,
  getText,
  sortTextDescendingOrder
} from './layerUtil'

export default function(){
  let document = sketch.getSelectedDocument()
    let selectedLayers = document.selectedLayers
    if(!selectedLayers.isEmpty){
      let obj = selectedLayers.layers[0]
      let shape
      if(obj.type === "Group"){
        shape = getShapeFromGroup(obj)
      }
      let artboard = obj.parent
      let textLayers = getText(artboard.layers)
      let sortedTextLayer = sortTextDescendingOrder(textLayers)
      let originalObj = document.getLayerWithID(sortedTextLayer[0].name)
      if(originalObj){
        if(originalObj.type === "Group"){
          let orignalShape = getShapeFromGroup(originalObj)
          updateOriginalObject(orignalShape, shape)
        } else {
          updateOriginalObject(originalObj, obj)
        }
      }
    }
}

function getShapeFromGroup(obj){
  let layers = getShapePaths(obj.layers)
  obj = layers[0]
  return obj
}

function updateOriginalObject(originalObj, obj){
  let sObj = obj.sketchObject
  originalObj.style = obj.style
  let sOriginalObj = originalObj.sketchObject
  sOriginalObj.setCornerRadiusFloat(sObj.cornerRadiusFloat())
}