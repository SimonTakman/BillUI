import {mutate} from './mutationUtil'
//mutate(curValue, mutationRate, limit, prob)

const cornerRadiusProb = 0.9
const cornerRadiusRate = 1

export function mutateCornerRadius(obj) {
  let sObj = obj.sketchObject
  sObj.setCornerRadiusFloat(mutate(sObj.cornerRadiusFloat(), cornerRadiusRate, sObj.maximumAllowedRadius(), cornerRadiusProb))
}
