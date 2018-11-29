import {getLowestMutation, getHighestMutation, mutate} from './mutationUtil'

export function mutateCornerRadius(obj) {
  let sObj = obj.sketchObject
  let low = getLowestMutation(sObj.cornerRadiusFloat(), sObj.maximumAllowedRadius())
  let high = getHighestMutation(sObj.cornerRadiusFloat(), sObj.maximumAllowedRadius())
  sObj.setCornerRadiusFloat(mutate(low, high))
}
