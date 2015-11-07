
# nFlow [![Build Status](https://travis-ci.org/mere/nflow.svg?branch=master)](https://travis-ci.org/mere/nflow) [![npm version](https://badge.fury.io/js/nflow.svg)](https://badge.fury.io/js/nflow) [![Dependency Status](https://www.versioneye.com/nodejs/nflow/0.0.4/badge.svg)](https://www.versioneye.com/nodejs/nflow/0.0.4)
Event/data/control flow

> Work in progress, decent docs and examples are on the way

# API

```js
flow
  .create()
  .create('name') // create a new leaf node from flow
  .create('name', data)

flow
  .get(matcher, recursive)
  .getAll(matcher, recursive)
// matcher types:
//    String,   eg.: "test"
//    Regexp,   eg.: /test(.*)/
//    Function, eg.: (f)=>f.data()>25

flow
  .name()
  .name('test') 

flow
  .data() // getter
  .data({}) // setter
  .data({},{},{}) //setter with multiple payloads

flow
  .emit() // emit current flow object
  .emit('name') // create and emit 'name'
  .emit('name', data) // create and emit 'name' with data as the payload
  .emit(flow2) // detach and emit an existing flow object

flow
  .parent() // return the parent flow object
  .parent(null) // detach the flow object, creating a new subtree
  .parent(flow) // re-parent the flow object

flow.parents() // return all upstream flow objects

flow
  .direction()
  .direction(flow.direction.DEFAULT)
  .direction(flow.direction.UPSTREAM)
  .direction(flow.direction.DOWNSTREAM)
  .direction(flow.direction.NONE)

flow
  .children() //return all direct descendant nodes
  .children.all() // return all child nodes recursively

flow
  .cancel()
  .cancelled()
  .cancelled(true)

flow
  .stopPropagation()

flow
  .on('name')
  .on('name', handler)
  .on('name', handler1, handler 2)

```

### Internal Events

When a flow object mutates in any way, all connected flow objects are notified of the change.

`.data(newData)` triggers:
 -   `.on('flow.data', newData, oldData)` on the current flow object
 -   `.on('flow.children.data', flow, newData, oldData)` on all parent objects
 -   `.on('flow.parent.data', flow, newData, oldData)` on all child objects (recursively)


