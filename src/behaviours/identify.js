import { ERRORS
       , UNSET } from '../consts'
import { assert, dispatchInternalEvent } from '../utils'

export default (flow, defaults, name) => {
  /**
   * Return the unique ID of the node.
   *
   * @readonly
   * @return {String} UUID4 identifier of the current node
   */
  flow.guid = (...args) => {
    assert(args.length
         , ERRORS.invalidGuid)
    return flow.guid.value
  }
  flow.guid.value = createGuid()

  /**
   * Get/Set the name of a flow instance.
   *
   * #### Getter
   * ```js
   * .name() // returns the name of the current node
   * ```
   * #### Setter
   * ```js
   * .name('foo') // sets the name of the current node
   * ```
   * @param {string} name The name of the flow instance
   * @returns {flow} flow (Setter) the current flow instance
   * @returns {String} name (Getter) the name of the flow instance
   * @emits 'flow.name'
   * @emits 'flow.parent.name'
   * @emits 'flow.children.name'
   */
  flow.name = (name = UNSET) => {
    if (name === UNSET) return flow.name.value
    assert(typeof (name) !== 'string'
         , ERRORS.invalidName, name)
    var previousName = flow.name.value
    flow.name.value = name
    flow.namespace.localName.cache = null
    /**
     *
     * Dispatched when a node has been renamed.
     * @event 'flow.name'
     * @property {flow} flow - the renamed node.
     * @property {flow} newName - the new name of the node
     * @property {flow} oldName - the previous name of the node
     * @see flow.name
     */
    /**
     *
     * Dispatched when one of the node's parents has been renamed.
     * @event 'flow.parent.name'
     * @property {flow} flow - the renamed node.
     * @property {flow} newName - the new name of the node
     * @property {flow} oldName - the previous name of the node
     * @see flow.name
     */
    /**
     *
     * Dispatched when ove of the node's children(recursive) has been renamed.
     * @event 'flow.children.name'
     * @property {flow} flow - the renamed node.
     * @property {flow} newName - the new name of the node
     * @property {flow} oldName - the previous name of the node
     * @see flow.name
     */
    dispatchInternalEvent(flow, 'name', name, previousName)
    return flow
  }
  flow.name.value = name || ''
  flow.name.isFlow = true
  flow.name.isInternal = false

  flow.call = (...functions) => {
    functions
      .filter(f => typeof (f) === 'function')
      .forEach(f => f.call(flow, flow))
    return flow
  }
}

function createGuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, c => {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}
