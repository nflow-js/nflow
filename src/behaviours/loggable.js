import { serialise } from '../utils'

export default (flow) => {
  /**
   * JSON Stringified version of {@link flow.toObj} for logging and debugging.
   * @see flow.toObj
   * @memberof flow
   * @param  {String[]} props - The {@link flow} properties to include in the serialisation.
   * ```
   * let counter = nflow.create('counter-service')
   *  .data({ counter: 5 })
   *
   * counter.toObj('name', 'data')
   * // -> '{ "name": "timer-service", "counter": "5"}'
   * ```
   * Available properties:
   * - `"name"` - see {@link flow.name}
   * - `"guid"` - see {@link flow.guid}
   * - `"version"` - see {@link flow.version}
   * - `"data"` - see {@link flow.data}
   * - `"status"` - see {@link flow.status}
   * - `"parent"` - see {@link flow.parent}
   * - `"listeners"` - see {@link flow.on}
   * - `"children"` - see {@link flow.children}
   * - `"recipients"` - see {@link flow.emit.recipients}
   * @return {String} Serialised and JSON Stringified representation of the current node.
   */
  flow.toString = (...args) => {
    return JSON.stringify(flow.toObj(...args))
  }
  /**
   * Serialise the flow node into a json object
   * @param  {String[]} props - The {@link flow} properties to include in the serialisation.
   * ```
   * let counter = nflow.create('counter-service')
   *  .data({ counter: 5 })
   *
   * counter.toObj('name', 'data')
   * // -> { "name": "timer-service", "counter": "5"}
   * ```
   * Available properties:
   * - `"name"` - see {@link flow.name}
   * - `"guid"` - see {@link flow.guid}
   * - `"version"` - see {@link flow.version}
   * - `"data"` - see {@link flow.data}
   * - `"status"` - see {@link flow.status}
   * - `"parent"` - see {@link flow.parent}
   * - `"listeners"` - see {@link flow.on}
   * - `"children"` - see {@link flow.children}
   * - `"recipients"` - see {@link flow.emit.recipients}
   * @return {Object} Serialised JSON representation of the {@link flow} node
   */
  flow.toObj = (...args) => {
    const props = args.reduce((a, b) => { a[b] = 1; return a }, {})
    const hasProp = prop => !args.length || props[prop]
    const add = (name, valueF) => { if (hasProp(name)) obj[name] = valueF() }
    let obj = {}

    add('name', flow.name)
    add('guid', flow.guid)
    add('version', () => flow.version)
    add('status', flow.status)
    add('data', () => serialise(flow.data()))
    add('parent', () => ({
      name: flow.parent.value && flow.parent.value.name.value,
      guid: flow.parent.value && flow.parent.value.guid.value
    }))
    add('listeners', () => {
      const l = flow.on()
      let o = {}
      Object.keys(l)
        .forEach(key => {
          o[key] = l[key].map(f => f.name || 'function')
        })
      return o
    })
    add('children', () => flow.children.value
      .map(f => f.toObj('name', 'guid')))

    add('recipients', () => {
      return flow.emit.recipients &&
      flow.emit.recipients.map(f => ({
        direction: f.direction,
        flow: f.flow.toObj('name', 'guid'),
        route: f.route.map(f => ({
          flow: f.flow.toObj('name', 'guid'),
          direction: f.direction
        })),
        listeners: f.listeners.map(l => ({
          name: l.name,
          handlers: l.handlers.map(h => ({
            status: h.status,
            listener: serialise(h.listener)
          }))
        }))
      }))
    })
    return obj
  }
}
