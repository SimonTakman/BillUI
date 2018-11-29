import {MUTATION} from './constants'

export function getLowestMutation(currentIndex, limit){
  var fraction = Math.floor(currentIndex - limit * MUTATION)
  if(fraction < 0){
    fraction = 0
  }
  return fraction
}

export function getHighestMutation(currentIndex, limit){
  var fraction = Math.floor(currentIndex + limit * MUTATION)
  if(fraction > limit){
    fraction = limit
  }
  return fraction
}

export function mutate(low, high){
  var item = Math.floor(Math.random()*(high - low) + low)
  return item
}
