
# 0.2.0
 - `.call()` is now called with the current node as `this`
 - `.call()`: `this.target` is now referring to `this`, to make `.on` and `.call` handlers consistent
 - Added `.stopPropagation` variants for all flow directions, eg.:
   - `.stopPropagation.upstream()`
   - `.stopPropagation('upstream')`
   - `.stopPropagation('UPSTREAM')`
   - `.stopPropagation(flow.direction.UPSTREAM)`
 - `.version` API now exposes npm version
 - `flow.childRemoved` internal event is now deprecated.
 - `flow.childAdded` internal event is now deprecated.
 - `flow.parent` internal event has been added
 - `flow.parented` internal event has been added

