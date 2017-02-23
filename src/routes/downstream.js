import {DIRECTION} from '../consts'
import {createMatcher} from '../utils'

export default (flow, matcher) => {
  let match = createMatcher(matcher)
  let visitedNodesMap = {}
  let parent = flow.parent()
  let dir = f => {
    if (f === flow) return DIRECTION.CURRENT
    if (f === parent) return DIRECTION.UPSTREAM
    return DIRECTION.DOWNSTREAM
  }
  let route = getChildren(flow, [])
    .concat(getChildren(flow.parent()
      , [{flow: flow, direction: dir(flow)}]))

  return route
  function getChildren (flow, route) {
    if (visitedNodesMap[flow.guid()]) return []
    visitedNodesMap[flow.guid()] = true
    if (!match(flow)) return []
    route = route.concat([{flow: flow, direction: dir(flow)}])
    var nodes = [{ flow, route }]
    flow.children.value
      .forEach(f => (nodes = nodes.concat(getChildren(f, route))))
    return nodes
  }
}
