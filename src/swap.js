import sketch from 'sketch'
import {getText, sortTextDescendingOrder} from './layerUtil'

export default function(){
  let document = sketch.getSelectedDocument()
    let selectedLayers = document.selectedLayers
    if(!selectedLayers.isEmpty){
      let obj = selectedLayers.layers[0]
      let artboard = obj.parent
      let textLayers = getText(artboard.layers)
      let sortedTextLayer = sortTextDescendingOrder(textLayers)
      let sObj = obj.sketchObject
      let originalObj = document.getLayerWithID(sortedTextLayer[0].name)
      if(originalObj){ 
        originalObj.style = obj.style
        let sOriginalObj = originalObj.sketchObject
        sOriginalObj.setCornerRadiusFloat(sObj.cornerRadiusFloat())
      }
    }
}