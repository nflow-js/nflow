/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'
var sut

describe('Event Propagation', function () {
  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
  })

  describe('Flow stopPropagation()', function () {
    it('should stop event delegation', function (done) {
      function shouldCall () {
        this.stopPropagation()
      }
      function shouldNotCall () {
        done('stopped event should not call subsequent listeners')
      }

      sut
        .create('a') // parent
        .on('test', shouldNotCall)
        .create('b')
        .on('test', shouldCall)
        .create('c')
        .emit('test')

      setTimeout(done, 1)
    })

    it('should stop event delivery on same listener', function (done) {
      function shouldCall () {
        this.stopPropagation()
      }
      function shouldNotCall () {
        done('stopped event should not call subsequent listeners')
      }

      sut
        .create('b')
        .on('test', shouldCall, shouldNotCall)
        .create('c')
        .emit('test')

      setTimeout(done, 1)
    })

    it('should still emit events on stopped nodes', function (done) {
      function shouldCall () {
        done()
      }

      sut
        .create('b')
        .on('test', shouldCall)
        .stopPropagation()
        .create('c')
        .stopPropagation()
        .create('d')
        .emit('test')
    })
  })
  describe('re-dispatching()', function () {
    it('should re-emit event on detached subtrees', function () {
      let deliveryChain = []
      let process = function () { deliveryChain.push(this.target.name()) }
      let subtree = sut.create('subtree').parent(null)
      subtree.create('s-a').on('test', process)
      subtree.create('s-b').on('test', process)
      sut.create('a').on('test', process)
      sut.create('b').on('test', process)
        .on('test', process, function () {
          subtree.emit(this)
        })
      sut.create('c').on('test', process)
      sut.emit('test')
      expect(deliveryChain.join()).to.equal('a,b,s-a,s-b,c')
    })

    it('should not re-deliver event on existing listeners', function () {
      let deliveryChain = []
      let process = function () { deliveryChain.push(this.target.name()) }
      sut.create('a').on('test', process)
      sut.create('b').on('test', process)
      sut.create('c').on('test', process)
      sut.create('test')
        .emit()
        .emit()
        .emit()
      expect(deliveryChain.join()).to.equal('a,b,c')
    })
    it('should re-emit event to new listeners', function () {
      let deliveryChain = []
      let process = function () { deliveryChain.push(this.target.name()) }
      let reEmit = function () {
        this.stopPropagation()
        sut.create('d').on('test', process)
        this.emit()
      }
      sut.create('a').on('test', process)
      sut.create('b').on('test', process, reEmit)
      sut.create('c').on('test', process)
      sut.emit('test')
      expect(deliveryChain.join()).to.equal('a,b,c,d')
    })
  })

  describe('Flow stopPropagation() Modifiers', function () {
    it('should not accept stopPropagation(invalid_directon)', function (done) {
      try {
        sut.stopPropagation('dog')
      } catch (e) {
        expect(e).to.be.an.error
        done()
      }
    })
    it('should accept stopPropagation(valid_direction)', function (done) {
      sut.stopPropagation(sut.direction.UPSTREAM)
      sut.stopPropagation(sut.direction.DOWNSTREAM)
      sut.stopPropagation(sut.direction.CURRENT)
      done()
    })
    it('should stop UPSTREAM event propagation', function () {
      let deliveryChain = []
      let process = function () { deliveryChain.push(this.target.name()) }
      let stopUpstream = function () { this.stopPropagation.upstream() }
      let a = sut.create('a').on('test', process)
      let b = a.create('b').on('test', process, stopUpstream)
      a.create('b1').on('test', process)
      b.create('c0').on('test', process)
      let c1 = b.create('c1').on('test', process)
      c1.create('d').on('test', process)
      c1.emit('test')

      expect(deliveryChain.join()).to.equal('c1,b,c0,d')
    })
    it('should not stop UPSTREAM event propagation', function () {
      let deliveryChain = []
      let process = function () { deliveryChain.push(this.target.name()) }
      let stopUpstream = function () { this.stopPropagation.upstream() }
      let a = sut.create('a').on('test', process)
      let b = a.create('b').on('test', process, stopUpstream)
      a.create('b1').on('test', process)
      b.create('c0').on('test', process)
      let c1 = b.create('c1').on('test', process)
      c1.create('d').on('test', process)
      c1.emit('test')

      expect(deliveryChain.join()).to.equal('c1,b,c0,d')
    })
  })

  describe('Flow stopPropagation.current()', function () {
    function stopCurrent () {
      this.stopPropagation.current()
    }

    it('should accept stopPropagation.current()', function (done) {
      var calls = 0
      function shouldCall () {
        calls++
      }
      function shouldNotCall () {
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('a') // parent
        .on('test', shouldCall, shouldCall)
      var b = a.create('b')
        .on('test', stopCurrent, shouldNotCall, shouldNotCall)

      b.create('b')
        .on('test', shouldCall, shouldCall)

      b.create('c')
        .on('test', shouldCall, shouldCall)

      sut.emit('test')
      expect(calls).to.equal(6)

      setTimeout(done, 1)
    })

    it('should accept stopPropagation("current")', function (done) {
      var calls = 0
      function shouldCall () {
        calls++
      }
      function shouldNotCall () {
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('a') // parent
        .on('test', shouldCall, shouldCall)
      var b = a.create('b')
        .on('test', function () { this.stopPropagation('current') }, shouldNotCall, shouldNotCall)

      b.create('b')
        .on('test', shouldCall, shouldCall)

      b.create('c')
        .on('test', shouldCall, shouldCall)

      sut.emit('test')
      expect(calls).to.equal(6)

      setTimeout(done, 1)
    })

    it('stopPropagation.current() should work in the middle of the propagation chain', function (done) {
      var calls = 0
      function shouldCall () {
        calls++
      }
      function shouldNotCall () {
        done('stopped event should not call subsequent listeners')
      }

      sut
        .create('a') // parent
        .on('test', shouldCall
                  , function () { this.stopPropagation('current') }
                  , shouldNotCall
                  , shouldNotCall)

      sut.emit('test')
      expect(calls).to.equal(1)

      setTimeout(done, 1)
    })
  })
})
