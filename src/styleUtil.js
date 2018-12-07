import {
  MUTATION,
  BORDER_THICKNESS_RATE,
  BORDER_THICKNESS_PROB,
  SHADOW_RATE,
  BORDER_COLOR_PROB
} from './constants'
import {mutateColor, mutateShadowColor} from './colorUtil'
import {mutate, coinToss} from './mutationUtil'

export function mutateBorderColor(obj){
  if(coinToss(BORDER_COLOR_PROB)){
    if(obj !== undefined){
      mutateColor(obj)
    }
  }
}

export function mutateBorderThickness(obj){
  //console.log('inside mutateBorderThickness')
  if(obj.style.borders[0] !== undefined){
    let thickness = obj.style.borders[0].thickness
    let limit = getSmallestWidth(obj)
    let newBorderWidth = mutate(thickness, BORDER_THICKNESS_RATE, limit, BORDER_THICKNESS_PROB)
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
    if(coinToss(SHADOW_RATE)){
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
  if(coinToss(SHADOW_RATE)){
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
  temp = temp.substring(0, temp.length - 2)
  temp = temp + '80'
  s.color = temp
}

function getSmallestWidth(obj){
  if(obj.frame.width <= obj.frame.height){
    return Math.floor(obj.frame.width / 2)
  }else {
    return Math.floor(obj.frame.height / 2)
  }
}
