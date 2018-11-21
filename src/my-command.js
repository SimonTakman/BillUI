import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/


const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

//console.log(hexToRgb("#0033ff")) // [0, 51, 255]
//console.log(hexToRgb("#03f")) // [0, 51, 255]

//console.log(rgbToHex(0, 51, 255)); // '#0033ff'

export default function() {
  sketch.UI.message("It's alive 🙌")
}
