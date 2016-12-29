export const UNSET = {}
export const DIRECTION = {
  CURRENT: 'CURRENT',
  NONE: 'CURRENT', // deprecated
  DEFAULT: 'DEFAULT',
  UPSTREAM: 'UPSTREAM',
  DOWNSTREAM: 'DOWNSTREAM'
}

export const DIRECTION_BITMASK = {
  CURRENT: 1 << 0,
  NONE: 1 << 0, // 1 deprecated
  DEFAULT: 1 << 1, // 2
  UPSTREAM: 1 << 2, // 4
  DOWNSTREAM: 1 << 3 // 8
}

export const STATUS = {
  IDLE: 'IDLE',
  FLOWING: 'FLOWING',
  STOPPED: 'STOPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  DISPOSED: 'DISPOSED'
}

export const DEFAULTS = {
  factory: () => ({}),
  behaviours: [
    'identify',
    'stateful',
    'connect',
    'create',
    'disposable',
    'emit',
    'listen',
    'cancellable',
    'loggable',
    'stats',
    'namespace'
  ],
  direction: DIRECTION.DEFAULT
}
export const ERRORS = {
  invalidGuid: 'Invalid Argument. Guid-s are immutable. Please use the .name() API to change the name of a flow object.',
  invalidChildren: 'Invalid Argument. Please use child.parent(parent) to re-parent flow objects.',
  invalidListener: 'Invalid Arguments. Expected a String as the listenerName, got: %s',
  invalidListenerType: 'Invalid Listener function. Expected a function, got: %s',
  invalidEventName: 'Invalid Arguments. Please use .emit("foo", payload) to emit a flow event.',
  invalidName: 'Invalid flow Name. Expected a String value, got: %s',
  invalidParent: 'Invalid flow parent object. Expected a flow instance, got: %s',
  invalidParents: 'Invalid Argument. Please use the child.parent(parent) API to re-parent flow objects.',
  invalidStatus: 'Invalid Argument. The .status() API is read only',
  invalidNamespaceArgs: 'Invalid Argument. The .namespace() API is read only',
  invalidFullNamespace: 'Invalid Argument. The .namespace.match(full_ns) requires a full namespace array, got: %s',
  invalidDisposeArgs: 'Invalid Argument. The .dispose() API requires no parameters',
  invalidCancelArgs: 'Invalid Argument. The .cancel() API requires no parameters',
  invalidStopPropagationArgs: 'Invalid Argument. The .stopPropagation(direction) API requires either no parameters or a valid flow direction(eg. flow.direction.UPSTREAM)',
  invalidStopPropagationAugmentation: 'Invalid Argument. The .stopPropagation(direction) API can only be used on emitted events.',
  invalidRoot: 'Invalid Argument. The .parents.root() API is read only',
  invalidStatsArgs: 'Invalid Argument. The .stats() API requires an object'
}

export const NS_SEPARATOR = ':'
