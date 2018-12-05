import {MUTATION} from './constants'
import {mutate, coinToss} from './mutationUtil'
//mutate(curValue, mutationRate, limit, prob)

const fillColorProb = 0.95
const borderColorProb = 0.9
const shadowColorProb = 0.7

const fillColorRate = 0.1
const borderColorRate = 0.3
const shadowColorRate = 0.2

const colorLimit = 255

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
  if(coinToss(fillColorProb)){
    let temp = hexToRgb(obj.color)
    let newColorRGB = temp.map(x => mutate(x, fillColorRate, colorLimit, 1))
    let hex = rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])
    obj.color = hex
  }
}

export function mutateShadowColor(shadow) {
  if(coinToss(shadowColorProb)){
    let temp = hexToRgb(shadow.color)
    let newColorRGB = temp.map(x => mutate(x, shadowColorRate, colorLimit, 1))
    return rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2])
  }
  return shadow.color
}
