/**
 *  consts
 */

export const UNSET = {}
export const DIRECTION = {
  NONE: "NONE",
  DEFAULT: "DEFAULT",
  UPSTREAM: "UPSTREAM",
  DOWNSTREAM: "DOWNSTREAM"
}

export const STATUS = {
  IDLE: "IDLE",
  FLOWING: "FLOWING",
  STOPPED: "STOPPED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  DISPOSED: "DISPOSED"
}

export const DEFAULTS = {
  factory: ()=>({}),
  behaviours:[
    'identify',
    'stateful',
    'connect',
    'create',
    'emit',
    'listen',
    'cancellable',
    'loggable'
  ],
  direction: DIRECTION.DEFAULT
}
export const ERRORS = {
  invalidGuid:     'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.'
, invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects.'
, invalidListener: 'Invalid Arguments. Please use .on("foo", handler) to create a listener.'
, invalidListenerType: 'Invalid Listener function. Expected a function, got: %s'
, invalidEventName:'Invalid Arguments. Please use .emit("foo", payload) to emit a flow event.'
, invalidName:'Invalid flow Name. Expected a String value, got: %s'
, invalidParent:'Invalid flow parent object. Expected a flow instance, got: %s'
, invalidParents:'Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.'
, invalidStatus:'Invalid Argument. The .status() API is read only'
, invalidDisposeArgs:'Invalid Argument. The .dispose() API requires no parameters'
, invalidCancelArgs:'Invalid Argument. The .cancel() API requires no parameters'
, invalidStopPropagationArgs:'Invalid Argument. The .stopPropagation() API requires no parameters'
, invalidRoot:'Invalid Argument. The .parents.root() API is read only'
}
