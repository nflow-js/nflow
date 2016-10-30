import {DIRECTION} from '../consts'
/*
 *  returns: all parent nodes
 */
export default (flow) => {
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
}
