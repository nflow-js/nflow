

# API

flow
  .create()
  .create('name')
  .create('name', data)

flow
  .name()
  .name('test')

flow
  .data()
  .data({})

flow
  .emit()
  .emit('name')
  .emit('name', data)
  .emit(flow)

flow
  .parent()
  .parent(null)
  .parent(flow)

flow
  .direction()
  .direction(flow.direction.DEFAULT)
  .direction(flow.direction.UPSTREAM)
  .direction(flow.direction.DOWNSTREAM)
  .direction(flow.direction.NONE)

flow
  .owner()

flow
  .children()

flow
  .cancel()
  .cancelled()
  .cancelled(true)

flow
  .stopPropagation()

flow
  .on()
  .on('name', handler)
  .on((e)=>e.name=='name'), handler)

flow
  .matcher((e, key)=>e.name==key)

flow
  .logger(flow
    .on('create', handler)
    .on('created', handler)
    .on('emit', handler)
    .on('emitted', handler)
  )

flow
  .route(flow)


  )

/**
 *  private API
 */

flow
  .listeners[]
  .childListeners[]
 
flow




# Trees
The hierarchical relationship between Flow objects is normally represented as a single Tree data structure.
Detaching allows you to turn this structure into several disconnected trees:
//PIC

# Recursion 
Re-parenting allows you to create loops in the flow hierarchy:
//PIC

