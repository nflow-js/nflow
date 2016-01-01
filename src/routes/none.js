/**
 *  returns: only itself and the node emitting it
 */
export default (flow)=>{
  return [flow]
    .concat(flow.parent())
    .map((flow,i,arr)=>({
      flow,
      route: arr.slice(0,i+1).reverse()
    }))
}

