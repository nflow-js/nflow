import {DIRECTION} from '../consts'

export default (flow)=>{
  var visitedNodesMap = {}
  
  var route = getChildren(flow, [])
    .concat(getChildren(flow.parent()
      ,[{flow:flow, direction: DIRECTION.DOWNSTREAM}]))
  
  return route;
  function getChildren(flow, route){
    if (visitedNodesMap[flow.guid()]) return []
    visitedNodesMap[flow.guid()] = true
    route = route.concat([{flow:flow, direction: DIRECTION.DOWNSTREAM}])
    var nodes = [{ flow, route }]
    flow.children()
      .forEach(f=>nodes = nodes.concat(getChildren(f,route)))
    return nodes
  }
}


