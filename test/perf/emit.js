/* globals Benchmark */
import nflow from 'nflow'

let suite = Benchmark.Suite()
let sut = null

function setup () {
  sut = nflow.create('sut')
    .on('test', () => {})
    .parent(null)
  let child = sut
  for (var i = 0; i < 40; i++) {
    child = child.create('child')
  }
}
console.log('Running perf tests')
setup()
suite.add('.emit("test")', () => {
  sut.emit('test')
})
// suite.add('.create("test")', () => {
//   sut.create('test')
// })
// suite.add('.on("test")', () => {
//   sut.on('test', () => {})
// })
.on('cycle', event => {
  console.log(String(event.target))
})
// .on('complete', () => {
//   console.log('Fastest is ' + this.filter('fastest').map('name'))
// })
.run({ 'async': true })
