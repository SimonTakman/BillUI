import {
  MUTATION,
  FILL_COLOR_PROB,
  SHADOW_COLOR_PROB,
  BORDER_COLOR_RATE,
  SHADOW_COLOR_RATE,
  COLOR_LIMIT,
  FILL_COLOR_RATE
} from './constants'
import {mutate, coinToss} from './mutationUtil'

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
  if(coinToss(FILL_COLOR_PROB)){
    let temp = hexToRgb(obj.color)
    let newColorRGB = temp.map(x => mutate(x, FILL_COLOR_RATE, COLOR_LIMIT, 1))
    let hex = rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])
    obj.color = hex
  }
}

export function mutateShadowColor(shadow) {
  if(coinToss(SHADOW_COLOR_PROB)){
    let temp = hexToRgb(shadow.color)
    let newColorRGB = temp.map(x => mutate(x, SHADOW_COLOR_RATE, COLOR_LIMIT, 1))
    return rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])
  }
  return shadow.color
}
