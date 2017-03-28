## Cancelling events

Even cancellation is useful when a chain of asynchronous events need to be stopped halfway through execution.

Coming soon...


<example>
  <hide>
var handler1 = ()=>{}
var handler2 = ()=>{}
</hide>

<show>
import nflow from 'nflow'
</show>
let a = nflow.create('a')
let b = nflow.create('b')

a.create('x')
  .on('hello', handler1)

a.create('y')
 .on('hello', handler2)

 b.emit('hello')
</example>
