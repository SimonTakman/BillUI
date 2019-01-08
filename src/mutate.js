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
    if(!selectedLayers.isEmpty) {
      let layers = getShape(selectedLayers)
      if(layers !== null){
        createMutations(layers.layers[0], selectedParameters, null)
      } else {
        if(selectedLayers.layers[0].type === "SymbolInstance"){
          let symbolmaster = document.getSymbolMasterWithID(selectedLayers.layers[0].symbolId)
          if(symbolmaster){
            console.log(symbolmaster)
            createMutations(symbolmaster.layers[0], selectedParameters, null)
            //TODO: Update element on the symbolmaster
          }
        } else {
          sketch.UI.message("No layers found")
        }
      }
    } else {
      sketch.UI.message("BillUI: No selected layer. Select a layer in order to mutate")
    }
}

function createMutations(layer, selectedParameters, symbolLayer){
  let artboardProperties
  if(symbolLayer){
    artboardProperties = createArtboardTemplate(symbolLayer)
  } else {
    artboardProperties = createArtboardTemplate(layer)
  }
  
  let originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(layer, artboardProperties.parentArtboard, artboardProperties.originalText)
  duplicateNewLayers(originalShapeInNewArtboard, selectedParameters, AMOUNT_COPIES, artboardProperties.mutationText.frame)
}
