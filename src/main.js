import sketch from 'sketch'
import {mutateColor} from './colorUtil'
// documentation: https://developer.sketchapp.com/reference/api/

//This is our main function that triggers when we start the file
export default function() {
  //let hexNumber = rgbToHex(122,32,11)
  let document = sketch.getSelectedDocument()
  //let page = document.selectedPage
  //let page = document.selectedPage
  //let layer = document.selectedLayers
  let shape = document.getLayersNamed("Rectangle")[0]
  let color = mutateColor(shape.style.fills[0].color)
  shape.style.fills[0].color = color
  sketch.UI.message("It's lol  🙌")
}
