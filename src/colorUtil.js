import {MUTATION} from './constants'
import {getLowestMutation, getHighestMutation, mutate} from './mutationUtil'

//getLowestMutation(currentIndex, limit)

let color = '#65F0FF'


//TODO: add export
//TODO: Added ff for opacity reasons
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('') + 'ff'

//TODO: add export
const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export function mutateColor(obj) {
  let temp = hexToRgb(obj.color)
  let newColorRGB = temp.map(x => mutate(getLowestMutation(x, 255), getHighestMutation(x, 255)))
  let hex = rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])
  obj.color = hex
}

export function mutateShadowColor(shadow) {
  let temp = hexToRgb(shadow.color)
  let newColorRGB = temp.map(x => mutate(getLowestMutation(x, 255), getHighestMutation(x, 255)))
  return rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])

}
