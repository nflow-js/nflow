import { createMatcher } from '../utils'
import {DIRECTION} from '../consts'

/*
 *  returns: all parent nodes
 */
export default (flow, matcher) => {
  let match = createMatcher(matcher)
  return [flow]
    .concat(flow.parents())
    .map((flow, i, arr) => ({
      flow,
      route: arr.slice(0, i + 1)
        .map(f => ({
          flow: f,
          direction: DIRECTION.UPSTREAM
        }))
    }))
    .filter(f => match(f.flow))
}
