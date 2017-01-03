export const serialise = o => JSON.stringify(o, replacer())

const RECURSION_LIMIT = 1024

function replacer () {
  let stack = []
  let r = 0
  let i
  return function replacer (key, value) {
    if (key === '') {
      stack = []
      r = 0
    }
    let val = parseValue(value)
    if (val !== undefined) return val
    if (!value || RECURSION_LIMIT < ++r) return undefined
    i = stack.indexOf(value)
    if (i < 0) return stack.push(value) && value
    return '*Recursive' + i
  }
}

function parseValue (value) {
  switch (typeof value) {
    case 'function':
      return ''.concat(
          'function ',
          value.name || 'anonymous',
          '(',
            Array(value.length + 1).join(',arg').slice(1),
          ')'
        )
    case 'boolean':
    case 'number':
    case 'string':
      return value
  }
}
