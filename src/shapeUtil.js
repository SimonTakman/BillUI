import {mutate} from './mutationUtil'
import {
  CORNER_RADIUS_PROB,
  CORNER_RADIUS_RATE
} from './constants'

export function mutateCornerRadius(obj) {
  let sObj = obj.sketchObject
  sObj.setCornerRadiusFloat(mutate(sObj.cornerRadiusFloat(), CORNER_RADIUS_RATE, sObj.maximumAllowedRadius(), CORNER_RADIUS_PROB))
}
