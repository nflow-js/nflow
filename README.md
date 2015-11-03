
# nFlow
Hierarchical event dispatcher

### Work in progress 


# API

```js
flow
  .create()
  .create('name') // create a new leaf node from flow
  .create('name', data)

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
