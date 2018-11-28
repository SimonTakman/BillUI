import {MUTATION} from './constants'
import {mutateColor} from './colorUtil'

const enableShadow = "{ blur: 4, x: 0, y: 2, spread: 0, color: '#00000000', enabled: true }"

export function mutateBorderColor(obj){
  console.log('inside mutateBorderColor')
  if(obj.style.borders[0] !== undefined){
    let bColor = mutateColor(obj.style.borders[0].color)
    obj.style.borders[0].color = bColor
  }
}

export function mutateBorderWidth(obj){
  console.log('inside mutateBorderWidth')
  if(obj.style.borders[0] !== undefined){
    let thickness = obj.style.borders[0].thickness
    let limit = getSmallestWidth(obj)
    let newBorderWidth = mutate(getLowestMutationBorderWidth(thickness, limit), getHighestMutationBorderWidth(thickness, limit))
    obj.style.borders[0].thickness = newBorderWidth
  }
}

//TODO: Clear when disable shadow!
export function mutateShadow(obj){
  console.log('inside mutateShadow')
  console.log(obj.style.sketchObject)
  let shape = obj.style.sketchObject
  if(shape.hasEnabledShadow() === 0 || shape.hasEnabledShadow() === undefined) {
    let shouldEnable = mutate(0,100)
    if(shouldEnable <= 50){
      shape.addStylePartOfType(2)
    }
  }
  else {
    console.log('FUCKING FILLED')
    let shouldEnable = mutate(0,100)
    if(shouldEnable <= 100 * MUTATION){
      console.log('Disable Shadow')
      shape.disableAllShadows()
    }else {
      console.log('Mutate Shadow')
      let shadow = obj.style.shadows[0]
      setShadowColor(shadow)
      setOneUnitRandomness(shadow, 'blur', shadow.blur)
      setOneUnitRandomness(shadow, 'x', shadow.x)
      setOneUnitRandomness(shadow, 'y', shadow.y)
      setOneUnitRandomness(shadow, 'spread', shadow.spread)
    }
  }
}

function setOneUnitRandomness(obj, type, prop){
  console.log(prop)
  if(mutate(0, 100) <= 100 * MUTATION){
    if(prop === 0) {
      prop = 1
    } else {
      let dice = mutate(0, 100)
      if(dice <= 50) {
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

function setShadowX(obj){
  console.log(obj)
}

function setShadowY(obj){
  console.log(obj)
}

function setShadowSpread(obj){
  console.log(obj)
}

function setShadowColor(s){
  let temp = mutateColor(s.color)
  console.log(temp)
  temp = temp.substring(0, temp.length - 2)
  temp = temp + '80'
  console.log(temp)
  s.color = temp
  console.log(s.color)
}

function getSmallestWidth(obj){
  if(obj.frame.width <= obj.frame.height){
    return Math.floor(obj.frame.width / 2)
  }else {
    return Math.floor(obj.frame.height / 2)
  }
}

function getLowestMutationBorderWidth(borderWidthFraction, limit){
  var fraction = Math.floor(borderWidthFraction - limit * MUTATION)
  if(fraction < 0){
    fraction = 0
  }
  return fraction
}

function getHighestMutationBorderWidth(borderWidthFraction, limit){
  var fraction = Math.floor(borderWidthFraction + limit * MUTATION)
  if(fraction > limit){
    fraction = limit
  }
  return fraction
}

function mutate(low, high){
  var item = Math.floor(Math.random()*(high - low) + low)
  return item
}
