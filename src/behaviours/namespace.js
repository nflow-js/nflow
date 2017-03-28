import { assert, getLocalName } from '../utils'
import { ERRORS, NS_SEPARATOR } from '../consts'

export default (flow, defaults, name, data) => {
  /**
   * **Getter only**.
   * Return the full namespace of the node including:
   *  - implicit namespace identifiers (see {@link flow.namespace.implicit}),
   *  - explicit namespace identifiers (see {@link flow.namespace.explicit})
   *  - and the local name. (see {@link flow.namespace.localName})
   *
   * ```
   * let foo = nflow
   *   .create('a')
   *   .create('b')
   *   .create('x:y:foo')
   *
   * foo.namespace() // -> "nflow:a:b:x:y:foo"
   * ```
   * @tutorial namespacing
   * @return {String} The full namespace of the node
   * @memberof flow#internal
   * @alias namespace
   */
  flow.namespace = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow.namespace.path()
      .map(f => f.name())
      .join(NS_SEPARATOR)
  }

  /**
   * **Getter only**.
   * Return all {@link flow} nodes that form the current node's namespace
   * ```js
   * let a = nflow.create('a')
   * let b = a.create('b')
   * let foo = b.create('x:y:foo')
   *
   * a.namespace() // -> [nflow, a]
   * foo.namespace() // -> [nflow, a, b, foo]
   * ```
   * @tutorial namespacing
   * @alias namespace.path
   * @memberof flow
   * @return {flow[]} Array of nodes that make up the current node's full namespace
   * @memberof flow#internal
   * @alias namespace.path
   */
  flow.namespace.path = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .parents()
      .reverse()
      .concat(flow)
  }

  /**
   * Return the implicit namespace segment of the current node.
   *
   * A node's implicit namespace is defined by the node's parents:
   * ```js
   * let a = nflow.create('a')
   * let b = a.create('b')
   * let foo = b.create('x:y:foo')
   *
   * a.namespace.implicit() // -> ["nflow"]
   * foo.namespace.implicit() // -> ["nflow", "a", "b"]
   * ```
   * @alias namespace.implicit
   * @memberof flow
   * @return {String[]} The implicit namespace segment of the node
   * @memberof flow#internal
   * @alias namespace.implicit
   */
  flow.namespace.implicit = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow
      .parents()
      .reverse()
      .map(f => f.name())
  }
  /**
   * Return the `explicit` namespace segment of the node.
   * The explicit namespace segment is given as part of the node's {@link flow.name|name}
   * ```
   * let foo = nflow.create(a:b:foo)
   * foo.namespace.explicit() // "a:b"
   * ```
   * @alias namespace.explicit
   * @memberof flow
   * @return {String} The explicit namespace identifier of the node
   * @memberof flow#internal
   * @alias namespace.explicit
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
   * Return the `local name` segment of the node.
   * The local name is the node's name, minus any explicit namespace given as part of the node's {@link flow.name|name}.
   * ```
   * let foo = nflow.create(a:b:foo)
   * foo.namespace.localName() // "foo"
   * ```
   * @see flow.namespace.explicit
   * @alias namespace.localName
   * @memberof flow
   * @return {String} The explicit namespace identifier of the node
   * @memberof flow#internal
   * @alias namespace.localName
   */
  flow.namespace.localName = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    if (flow.namespace.localName.cache === null) {
      flow.namespace.localName.cache = flow
      .name()
      .split(NS_SEPARATOR)
      .pop()
    }
    return flow.namespace.localName.cache
  }
  flow.namespace.localName.cache = null
  /**
   * **Getter only**.
   * Return the full namespace of the node including:
   *  - implicit namespace identifiers (see {@link flow.namespace.implicit}),
   *  - explicit namespace identifiers (see {@link flow.namespace.explicit})
   *  - and the local name. (see {@link flow.namespace.localName})
   *
   * ```
   * let foo = nflow
   *   .create('a')
   *   .create('b')
   *   .create('x:y:foo')
   *
   * foo.namespace.full() // -> ["nflow", "a", "b", "x", "y", "foo"]
   * ```
   * @tutorial namespacing
   * @return {String[]} The full namespace of the node
   * @alias namespace.full
   * @memberof flow#internal
   * @alias namespace.full
   * */
  flow.namespace.full = (...args) => {
    assert(args.length, ERRORS.invalidNamespaceArgs)
    return flow.namespace().split(NS_SEPARATOR)
  }

  /**
   * @internal
   * Checks if the emitted event and the receiving node are in compatible namespaces.
   * An event can be delivered if the following checks pass:
   *  - the local names are the same
   *  - the full NS of the sender contains the explicit NS of the receiver
   *  - the full NS of the receiver contains the explicit NS of the sender
   * @param  {flow} listenerNode The node receiving the event
   * @param  {String} listenerName the name of the event, optionally including the explicit namespace, eg.:`x:y:foo`
   * @return {Boolean} true if the event can be delivered to the receiving node
   * @memberof flow#internal
   * @alias namespace.match
   */
  flow.namespace.match = (listenerNode, listenerName) => {
    assert(
       typeof (listenerName) !== 'string'
     , ERRORS.invalidListener
     , listenerName)

     // 1. check for exact match
    if (flow.name.value === listenerName && listenerName.indexOf(NS_SEPARATOR) === -1) return true
    // 2. Check for local name match
    if (!isLocalNameMatch({id: flow.namespace.localName(), f: flow}, listenerName)) return false
    // 3. Check that the receiver's explicit NS matches the sender's NS
    if (!isNamespaceMatch(flow, flow.name(), listenerNode.namespace.localise(listenerName))) return false
    // 4. Check that the sender's explicit NS matches the receiver's NS
    if (!isNamespaceMatch(listenerNode, listenerName, flow.namespace.localise(flow.name()))) return false
    return true
  }

  /*
   * Checks if the node's FULL NS matches the name's explicit identifiers
   * @param  {flow}  node the node to get the full NS from
   * @param  {String}  localisedNameTo The node name to get the explicit identifiers from
   * @return {Boolean} true if the name's explicit identifiers sit inside the node's NS
   * @ignore
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
   * let foo = nflow
   *  .create('x')
   *  .create('y')
   *  .create('x:z:foo')
   *  foo.namespace.localise('x:z:foo') // -> '{guid-of-x}:z:foo'
   * @param  {String} listenerName The name of the listener, optionally including the explicit ns
   * @return {String} The localised Namespace
   * @memberof flow#internal
   * @alias namespace.localise
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

/*
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
