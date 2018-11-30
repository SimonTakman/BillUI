function getLowestMutation(currentIndex, limit, mutationRate){
  var fraction = Math.floor(currentIndex - limit * mutationRate)
  if(fraction < 0){
    fraction = 0
  }
  return fraction
}

function getHighestMutation(currentIndex, limit, mutationRate){
  var fraction = Math.floor(currentIndex + limit * mutationRate)
  if(fraction > limit){
    fraction = limit
  }
  return fraction
}

function mutateValue(low, high){
  var item = Math.floor(Math.random()*(high - low) + low)
  return item
}

export function coinToss(prob) {
  let flipp = mutateValue(0, 100)
  if(flipp <= 100 * prob){
    return true
  }else {
    return false
  }
}

export function mutate(curValue, mutationRate, limit, prob) {
  if(coinToss(prob)){
    let low = getLowestMutation(curValue, limit, mutationRate)
    let high = getHighestMutation(curValue, limit, mutationRate)
    return mutateValue(low, high)
  }
}
