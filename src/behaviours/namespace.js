import { assert, getLocalName } from '../utils'
import { ERRORS, NS_SEPARATOR } from '../consts'

export default (flow, defaults, name, data) => {
  flow.namespace = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow.namespace.path()
      .map(f => f.name())
      .join(NS_SEPARATOR)
  }

  flow.namespace.path = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .parents()
      .reverse()
      .concat(flow)
  }

  /**
   * The Implicit namespace part of the node is defined by its parents.
   * For example:
   * If the node's parent is `a` and `a`'s parent is `b`:
   * The node's implicit namespace is `a:b`
   * @param  none
   * @return {String[]} The implicit namespace segment of the node
   */
  flow.namespace.implicit = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .parents()
      .reverse()
      .map(f => f.name())
  }
  /**
   * The Explicit namespace identifier is defined as part of the node's name
   * For example:
   * If the node's name is `x:y:foo`
   * The node's explicit namespace is `x:y`
   * @param  none
   * @return {String[]} The explicit namespace identifier of the node
   */
  flow.namespace.explicit = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    let ns = flow
      .name()
      .split(NS_SEPARATOR)
    ns.pop()
    return ns
  }

  /**
   * The local name segment of the full namespace
   * @example
   * let foo = flow.create('x:y:foo')
   * foo.namespace.localName() // -> foo'
   * @param  none
   * @return {String} The local name of the node
   */
  flow.namespace.localName = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .name()
      .split(NS_SEPARATOR)
      .pop()
  }
  /**
   * The full namespace of the node including the:
   *  - implicit ns identifiers,
   *  - explicit namespace identifiers
   *  - and the local name.
   * @example
   * let foo = flow.create('a').create('b').create('x:y:foo')
   * foo.namespace.full() // -> ['a','b','x','y','foo']
   * @param  none
   * @return {Array} The full namespace of the node
   */
  flow.namespace.full = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow.namespace.implicit()
      .concat(flow.name().split(NS_SEPARATOR))
  }

  /**
   * Checks if the emitted event and the receiving node are in compatible namespaces.
   * An event can be delivered if the following checks pass:
   *  - the local names are the same
   *  - the full NS of the sender contains the explicit NS of the receiver
   *  - the full NS of the receiver contains the explicit NS of the sender
   * @param  {flow} listenerNode The node receiving the event
   * @param  {[type]} listenerName the name of the event, optionally including the explicit namespace, eg.:`x:y:foo`
   * @return {[type]} true if the event can be delivered to the receiving node
   */
  flow.namespace.match = (listenerNode, listenerName) => {
    assert(
       typeof (listenerName) !== 'string'
     , ERRORS.invalidListener
     , listenerName)

    // 1. Check that the local names match
    if (!isLocalNameMatch({id: getLocalName(flow.name()), f: flow}, listenerName)) return false
    // 2. Check that the receiver's explicit NS matches the sender's NS
    if (!isNamespaceMatch(flow, flow.name(), listenerNode.namespace.localise(listenerName))) return false
    // 2. Check that the sender's explicit NS matches the receiver's NS
    if (!isNamespaceMatch(listenerNode, listenerName, flow.namespace.localise(flow.name()))) return false
    return true
  }

  /**
   * Checks if the node's FULL NS matches the name's explicit identifiers
   * @param  {[type]}  node the node to get the full NS from
   * @param  {[type]}  localisedNameTo The node name to get the explicit identifiers from
   * @return {Boolean} true if the name's explicit identifiers sit inside the node's NS
   */
  function isNamespaceMatch (node, nameFrom, localisedNameTo) {
    let fullIDs = nameFrom
      .split(NS_SEPARATOR)
      .map(id => ({ id, f: node }))
      .reverse()
      .concat(node
        .parents()
        .map(f => ({ id: f.name(), f }))
      )

    let explicitIDs = localisedNameTo.split(NS_SEPARATOR).reverse()
    return explicitIDs.every(segment => {
      let foundSegment = false
      while (fullIDs.length) {
        let p = fullIDs.shift()
        if (isLocalNameMatch(p, segment)) {
          foundSegment = true
          break
        }
      }
      return foundSegment
    })
  }

  /**
   * Resolves a listener name(ie. explicit ns + local name) to a localised one,
   * replacing generic namespace identifiers with explicit guid-s
   * @example
   * let foo = flow
   *  .create('x')
   *  .create('y')
   *  .create('x:z:foo')
   *  foo.namespace.localise() // -> '{guid-of-x}:z:foo'
   * @param  {String} listenerName The name of the listener, optionally including the explicit ns
   * @return {String} The localised Namespace
   */
  flow.namespace.localise = (ns) => {
    assert(
       typeof (ns) !== 'string'
     , ERRORS.invalidListener
     , ns)

    let segments = ns.split(NS_SEPARATOR)
    if (segments.length > 1 &&
      flow.parents.has(segments[0])) {
      segments[0] = flow.parents.get(segments[0]).guid()
    }

    return segments.join(NS_SEPARATOR)
  }
}

/**
 * Checks if the local name of the sender and receiver nodes are the same
 * @param  {String}  senderLocalName    The name of the emitted event
 * @param  {String}  receiverLocalName The name of the listener
 * @return {Boolean} true if the local names are the same
 */
function isLocalNameMatch ({id, f}, receiverName) {
  const receiverLocalName = getLocalName(receiverName)

  const match = id === '*' ||
    receiverLocalName === '*' ||
    f.guid() === receiverLocalName ||
    id === receiverLocalName

  return match
}
