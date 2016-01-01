export default (flow)=>{
  var visitedNodesMap = {}
  
  var route = getChildren(flow, [])
    .concat(getChildren(flow.parent(), [flow]))
  
  return route;
  function getChildren(flow, route){
    if (visitedNodesMap[flow.guid()]) return []
    visitedNodesMap[flow.guid()] = true
    route = [flow].concat(route)
    var nodes = [{ flow, route }]
    flow.children()
      .forEach(f=>nodes = nodes.concat(getChildren(f,route)))
    return nodes
  }
}


