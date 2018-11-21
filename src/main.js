import sketch from 'sketch'
import {rgbToHex, hexToRgb} from './colorUtil'
// documentation: https://developer.sketchapp.com/reference/api/

//This is our main function that triggers when we start the file
export default function() {
  let hexNumber = rgbToHex(122,32,11);
  sketch.UI.message("It's lol "+hexNumber +" 🙌")
}
