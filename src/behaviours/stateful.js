import { dispatchInternalEvent } from '../utils'

export default (flow, defaults, name, data) => {
  /**
   * `Get` or `Set` the current node's data.
   * If multiple data objects are given(`.data(a,b,c)`), they will be returned
   * in an Array.
   * Every {@link flow} node has an internal data storage for storing state.
   * @param  {...object} [data] the data to be stored in the node
   * @return {object|object[]} (Getter) the data stored in the node.
   * @return {flow} (Setter) The current node
   * @emits 'flow.data'
   * @emits 'flow.parent.data'
   * @emits 'flow.children.data'
   * @example <caption>Setting/getting data on a node:</caption>
   * let a = nflow.create('a')
   *   .data({ a:5 })
   *
   * let b = a.create('b')
   *  .data(2, 3, { c: 4 })
   *
   * a.data() // -> { a: 5 }
   * b.data() // -> [2, 3, { c: 4 } ]
   *
   */
  flow.data = (...data) => {
    if (!data.length) {
      return (flow.data.value.length <= 1)
        ? flow.data.value[0]
        : flow.data.value
    }
    var oldData = flow.data.value
    flow.data.value = data
    /**
     *
     * Dispatched when the data of the node has been changed.
     * @event 'flow.data'
     * @property {flow} flow - the node that stores the data
     * @property {object} newData - The new data stored in the node
     * @property {object} oldData - The old data stored in the node
     * @see flow.data
     */
    /**
     *
     * Dispatched when the data of a parent node has changed
     * @event 'flow.parent.data'
     * @property {flow} flow - the node that stores the data
     * @property {object} newData - The new data stored in the node
     * @property {object} oldData - The old data stored in the node
     * @see flow.data
     */
    /**
     *
     * Dispatched when the data of a child(recursive) node has changed
     * @event 'flow.children.data'
     * @property {flow} flow - the node that stores the data
     * @property {object} newData - The new data stored in the node
     * @property {object} oldData - The old data stored in the node
     * @see flow.data
     */
    dispatchInternalEvent(flow, 'data'
      , (data.length > 1 ? data : data[0])
      , (oldData.length > 1 ? oldData : oldData[0]))
    return flow
  }
  flow.data.value = data
}
