/* globals describe, it, beforeEach */
/* eslint no-unused-expressions: 0 */
import flow from 'nflow'
import {expect} from 'chai'

var sut

describe('Cancellation', () => {
  beforeEach(() => {
    sut = flow
      .create('sut')
      .parent(null)
  })
  describe('Flow Cancellation', () => {
    it('parent node should cancel all child nodes', () => {
      var a = sut.create('a') // parent
      var a1 = a.create('a1') // parent's sibling
      var b = a.create('b')   // SUT
      var b1 = a.create('b1') // sibling
      var c = b.create('c')   // child
      var c1 = b.create('c1') // child
      var d = c.create('d')   // grandchild

      b.cancel()

      // falsy
      expect(a.isCancelled()).to.be.false
      expect(a1.isCancelled()).to.be.false
      expect(sut.isCancelled()).to.be.false
      expect(b1.isCancelled()).to.be.false

      // truthy
      expect(b.isCancelled()).to.be.true
      expect(c.isCancelled()).to.be.true
      expect(c1.isCancelled()).to.be.true
      expect(d.isCancelled()).to.be.true
    })

    it('should dispatch flow.cancel', done => {
      sut.on('flow.cancel', () => done())
      sut.cancel()
    })
    it('should dispatch flow.parent.cancel', done => {
      sut.create('child').on('flow.parent.cancel', () => done())
      sut.cancel()
    })
    it('should dispatch flow.children.cancel', done => {
      sut.on('flow.children.cancel', () => done())
      sut.create('child').cancel()
    })

    it('should cancel event delegation.', done => {
      let shouldCall = function () { this.cancel() }
      let shouldNotCall = () => { done('cancelled event should not call subsequent listeners') }

      sut
        .create('a') // parent
        .on('test', shouldNotCall)
        .create('b')
        .on('test', shouldCall)
        .create('c')
        .emit('test')

      setTimeout(done, 10)
    })

    it('should cancel event delivery on same listener', done => {
      let shouldCall = function () { this.cancel() }
      let shouldNotCall = () => { done('cancelled event should not call subsequent listeners') }

      sut
        .create('b')
        .on('test', shouldCall, shouldNotCall)
        .create('c')
        .emit('test')

      setTimeout(done, 10)
    })

    it('should not emit events on cancelled nodes', done => {
      let shouldNotCall = () => { done('cancelled event should not call subsequent listeners') }

      sut
        .create('b')
        .cancel()
        .create('c')
        .on('test', shouldNotCall)
        .create('d')
        .emit('test')

      setTimeout(done, 10)
    })
    it('should not deliver events into a cancelled subtree', done => {
      let shouldCall = () => {
        done()
      }
      function shouldNotCall () {
        done('stopped event should not call listener')
      }
      var a = sut.create('a')
        .on('test', shouldNotCall)
      a.create('b')
        .on('test', shouldNotCall)

      var c = sut.create('c')
      c.create('d')
        .on('test', shouldCall)

      a.cancel()
      c.emit('test')
    })
  })
})
