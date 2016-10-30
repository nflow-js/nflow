import factory from '../factory'
import { dispatchInternalEvent } from '../utils'

export default (flow, defaults) => {
  /**
   * Create a new flow node.
   * @memberof flow
   * @param {string} name The name of the new node
   * @param {...object} [data] optional data stored in the node
   * @returns {flow} a new flow instance
   * @codepen
   * flow.create('user', {
   *   id: 12345,
   *   userName: 'jsmith'
   *   })
   *
   */
  flow.create = (name, ...data) => {
    var instance = factory(flow.create.defaults, name, data)
    instance.parent.value = flow
    flow.children.value.push(instance)
    inheritStats(instance)
    dispatchInternalEvent(flow, 'create', instance)

    return instance
  }

  flow.create.defaults = {
    factory: defaults.factory,
    behaviours: defaults.behaviours.concat(),
    direction: defaults.direction
  }
}

function inheritStats (flow) {
  let p = flow.parent()
  if (p) {
    let defaults = p.stats.value.defaults || {}
    let nodeDefaults = defaults[flow.name.value] || {}
    /* jshint ignore:start */
    flow.stats.value = {...nodeDefaults}
    /* jshint ignore:end */
  }
}
