import sketch from 'sketch'
import {
  duplicateNewLayers,
  duplicateOriginalLayerInNewArtboard,
  createArtboardTemplate
} from './main'
import { AMOUNT_COPIES } from './constants'
import { getShape } from './layerUtil'

export default function(){
  let selectedParameters = {
    "radious": true,
    "fillsColor": true,
    "bordersColor": true,
    "borderWidth": true,
    "shadow": true,
  }
  mutateWithParameters(selectedParameters)
}

export function mutateWithParameters(selectedParameters){
  let document = sketch.getSelectedDocument()
  let selectedLayers = document.selectedLayers
  //console.log(selectedLayers.layers)
  //let symbolmaster = document.getSymbolMasterWithID(selectedLayers.layers[0].symbolID)
  //console.log(symbolmaster)
    if(!selectedLayers.isEmpty) {
      let layers = getShape(selectedLayers)
      if(layers !== null){
        let artboardProperties = createArtboardTemplate(layers.layers[0])
        let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(layers.layers[0], artboardProperties.parentArtboard, artboardProperties.originalText)
        duplicateNewLayers(originalShapeInNewArtboard, selectedParameters, AMOUNT_COPIES, artboardProperties.mutationText.frame)
      } else {
        //TODO: Here we can check if the type is symbol instance or not
        sketch.UI.message("No layers found")
      }
    } else {
      sketch.UI.message("BillUI: No selected layer. Select a layer in order to mutate")
    }
}
