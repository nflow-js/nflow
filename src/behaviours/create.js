import factory from '../factory'
import { dispatchInternalEvent } from '../utils'

export default (flow, defaults) => {
  /* jshint ignore:start */
  /**
   * Create a new flow instance.
   * > **Note**: The parent of the newly created {@link flow} node is automatically set
   * to the flow node it was created from.
   * >
   * > To create a new event tree that's not connected to existing nodes, simply unparent it after creation:
   * > ```
   * > let a = nflow
   * >   .create('new-tree')
   * >   .parent(null)
   * > ```
   * **Aliases**
   * The following command chains have identical end results:
   * - `.create('a', someData)`
   * - `.create('a').data(someData)`
   * - `.create().name('a').data(someData)`
   *
   * @memberof flow
   * @param {string} name The name of the new node
   * @param {...object} [data] optional data stored in the new node
   * @returns {flow} the new flow instance
   * @example
   * let a = nflow.create('a')
   * let b = nflow.create('b')
   *
   * let c = a.create('c')
   * let d = a.create('d')
   * @emits 'flow.create'
   * @emits 'flow.parent.create'
   * @emits 'flow.children.create'
   */
  /* jshint ignore:end */
  flow.create = (name, ...data) => {
    var instance = factory(flow.create.defaults, name, data)
    instance.parent.value = flow
    flow.children.value.push(instance)
    inheritStats(instance)

    /**
     *
     * Dispatched when a node has been created.
     * @event 'flow.create'
     * @property {flow} flow - the node where the new node was created from(ie. the parent).
     * @property {flow} newNode - the created node.
     * @see flow.create
     */
    /**
     *
     * Dispatched when one of the node's parents has been created.
     * @event 'flow.parent.create'
     * @property {flow} flow - the node where the new node was created from(ie. the parent).
     * @property {flow} newNode - the created node.
     * @see flow.create
     */
    /**
     *
     * Dispatched when one of the node's children(recursive) has been created.
     * @event 'flow.children.create'
     * @property {flow} flow - the node where the new node was created from(ie. the parent).
     * @property {flow} newNode - the created node.
     * @see flow.create
     */
    dispatchInternalEvent(flow, 'create', instance)

    return instance
  }

  /**
   * Create a new flow node or return the existing one if the current node already has a child with the same name.
   * If multiple children have the same name, the first one will be returned.
   * If `...data` parameters are given, it will also set the data on the newly created or existing node.
   * @alias create.once
   * @memberof flow
   * @param {string} name The name of the new node
   * @param {...object} [data] optional data stored in the node
   * @returns {flow} the newly created or already existing flow instance
   */
  flow.create.once = (name, ...data) => {
    let instance = flow.get(name)
    if (instance) instance.data(...data)
    else instance = flow.create(name, ...data)
    return instance
  }

  /**
   * @internal
   * @type {Object}
   */
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
