import {DIRECTION} from '../consts'
/**
 *  returns: only itself and the node emitting it
 */
export default (flow)=>(
  [flow]
    .concat(flow.parent())
    .map((flow,i,arr)=>({
      flow,
      route: arr
        .slice(0,i+1)
        .map(f=>({
          flow:f,
          direction: DIRECTION.CURRENT
        }))
    }))
)