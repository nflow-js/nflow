import factory from '../factory'
import { DEFAULTS
       , NS_SEPARATOR } from '../consts'
import logger from '../logger'

export {serialise} from './serialiser'
/*
 *  utils
 */
export function assert (condition, error, val) {
  if (condition) {
    throw new Error(error
      .replace('%s', val))
  }
  return condition
}

export function isFlow (flow) {
  return flow &&
    flow.name &&
    flow.name.isFlow
}

export function isInternal (flow) {
  return flow &&
    flow.name &&
    flow.name.isInternal
}

export function createMatcher (matcher) {
  // match ALL
  if (matcher === true) return () => true
  // match NONE
  if (matcher === null || matcher === undefined || matcher === false) return () => false
  // match by name
  if (typeof (matcher) === 'string') { return f => f.name() === matcher }
  // match by regex
  if (typeof (matcher) === 'object' && matcher.test) return f => matcher.test(f.name())
  // match by instance
  if (isFlow(matcher)) return f => f === matcher
  // custom matcher
  return matcher
}

/*
 * returns the Local Name fragment of a namespaced listener or node name.
 * @example
 * 'a:b:foo' -> 'foo'
 * @param  {String} name Listener or node name
 * @return {String} the local name segment
 */
export function getLocalName (name) {
  return name
    .split(NS_SEPARATOR)
    .pop()
}

export function detach (flow) {
  flow.parent() &&
  flow.parent().children.detach(flow)
}

export function isDetached (flow) {
  return !flow.parent() ||
  !flow.parent().children.has(flow)
}

export function flatten (array) {
  return [].concat.apply([], array)
}

export function merge (source, target) {
  Object.keys(source).forEach(key => {
    target[key] = source[key]
  })
}

export function invalidateListenerCache (flow) {
  if (!flow) return
  updateListenerCache(flow)
  flow.parents().forEach(updateListenerCache)
}

function updateListenerCache (node) {
  node.on.listenerCache = {}
  for (let key in node.on.listenerMap) {
    node.on.listenerCache[getLocalName(key)] = true
  }
  node.children.value.forEach(f => {
    for (let key in f.on.listenerCache) {
      node.on.listenerCache[getLocalName(key)] = true
    }
  })
}

export function dispatchInternalEvent (flow, name, newData, oldData) {
  if (isIgnored(flow)) return
  if (isFlow(newData) && newData.name.isInternal) return

  let current = factory(DEFAULTS, 'flow.' + name)
  current.name.isInternal = true
  current.data.value = [newData, oldData]
  current.parent.value = flow
  current.emit.current()

  let up = factory(DEFAULTS, 'flow.children.' + name)
  up.name.isInternal = true
  up.data.value = [flow, newData, oldData]
  up.parent.value = flow.parent()
  up.emit.upstream()

  let down = factory(DEFAULTS, 'flow.parent.' + name)
  down.name.isInternal = true
  down.data.value = [flow, newData, oldData]
  flow.children.value.forEach(f => f.emit.downstream(down))

  logger.log(flow, name, newData, oldData)
}

function isIgnored (flow) {
  return flow.name.isInternal || [flow]
    .concat(flow.parents())
    .some(e => e.stats.value.ignore)
}
