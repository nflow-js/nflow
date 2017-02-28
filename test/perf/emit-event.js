import nflow from 'nflow'
let sut = null

setTimeout(start, 500)

function setup () {
  sut = nflow.create('sut')
    .on('test', () => {})
    .parent(null)
  let child = sut
  for (var i = 0; i < 50; i++) {
    child = child.create('child')
  }
}

function emit () {
  const now = window.performance.now()
  console.log('emitting event')
  window.performance.mark('emit-start')
  for (let a = 0; a < 7000; a++) sut.emit('test')
  window.performance.mark('emit-end')
  window.performance.measure('emit-event', 'emit-start', 'emit-end')
  console.log('event emitted', window.performance.now() - now)
}

function start () {
  setup()
  document
    .querySelector('.emit-event')
    .addEventListener('click', emit)
}
