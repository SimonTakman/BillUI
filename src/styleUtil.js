import {MUTATION} from './constants'
import {mutateColor, mutateShadowColor} from './colorUtil'
import {mutate, coinToss} from './mutationUtil'
//mutate(curValue, mutationRate, limit, prob)

const borderThicknessRate = 0.5
const borderThicknessProb = 0.7

const shadowRate = 0.2

export function mutateBorderColor(obj){
  //console.log('inside mutateBorderColor')
  if(obj !== undefined){
    mutateColor(obj)
  }
}

export function mutateBorderThickness(obj){
  //console.log('inside mutateBorderThickness')
  if(obj.style.borders[0] !== undefined){
    let thickness = obj.style.borders[0].thickness
    let limit = getSmallestWidth(obj)
    let newBorderWidth = mutate(thickness, borderThicknessRate, limit, borderThicknessProb)
    obj.style.borders[0].thickness = newBorderWidth
  }
}

export function mutateShadow(obj){
  let shape = obj.style.sketchObject
  if(shape.hasEnabledShadow() === 0) {
    if(coinToss(0.5)) {
      if(obj.style.shadows[0] !== undefined) {
        obj.style.shadows[0].enabled = true
      }else {
        shape.addStylePartOfType(2)
      }
    }
  }else {
    if(coinToss(shadowRate)){
      shape.disableAllShadows()
    }else {
      let shadow = obj.style.shadows[0]
      setOneUnitRandomness(shadow, 'blur', shadow.blur)
      setOneUnitRandomness(shadow, 'x', shadow.x)
      setOneUnitRandomness(shadow, 'y', shadow.y)
      setOneUnitRandomness(shadow, 'spread', shadow.spread)
      setShadowColor(shadow)
    }
  }
}

function setOneUnitRandomness(obj, type, prop){
  //console.log(prop)
  if(coinToss(shadowRate)){
    if(prop === 0) {
      prop = 1
    } else {
      if(coinToss(0.5)) {
        prop = prop - 1
      }else {
        prop = prop + 1
      }
    }
  }
  switch(type){
    case 'blur':
      obj.blur = prop
      break
    case 'x':
      obj.x = prop
      break
    case 'y':
      obj.y = prop
      break
    case 'spread':
      obj.spread = prop
      break
    default:
      console.log("Unknown type")
      break
  }
}


function setShadowColor(s){
  let temp = mutateShadowColor(s)
  //console.log(temp)
  temp = temp.substring(0, temp.length - 2)
  temp = temp + '80'
  //console.log(temp)
  s.color = temp
  //console.log(s.color)
}

function getSmallestWidth(obj){
  if(obj.frame.width <= obj.frame.height){
    return Math.floor(obj.frame.width / 2)
  }else {
    return Math.floor(obj.frame.height / 2)
  }
}
