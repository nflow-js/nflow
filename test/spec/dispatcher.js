/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'
var sut

describe('Dispatchers', function () {
  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
  })
  describe('.emit() API', function () {
    it('emit should create a new node', function () {
      var bar = sut.emit('bar')
      expect(bar.parent()).to.equal(sut)
    })

    it('should detach emitted node', function () {
      var bar = sut.emit('bar')
      expect(bar.parent().children()).to.not.contain(bar)
    })

    it('should emit orphaned node', function (done) {
      var orphaned = sut.create('bar').parent(null)
      orphaned.create('a').on('bar', () => {
        done()
      })
      orphaned.emit()
    })

    it('should emit new node', function (done) {
      var payload = {}
      var listener = function (data) {
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .emit('bar', payload)
    })

    it('should emit current node', function (done) {
      var payload = {}
      var listener = function (data) {
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .data(payload)
        .emit()
    })

    it('should deliver multiple payloads', function (done) {
      var payload1 = {}
      var payload2 = {}
      var listener = function (data1, data2) {
        expect(data1).to.equal(payload1)
        expect(data2).to.equal(payload2)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .data(payload1, payload2)
        .emit()
    })

    it('should deliver to multiple listeners on the same node', function (done) {
      var payload1 = {}
      var payload2 = {}
      var listener1 = function (data1, data2) {
        expect(data1).to.equal(payload1)
        expect(data2).to.equal(payload2)
        listener1.done = true
        listener2.done && done()
      }
      var listener2 = function (data1, data2) {
        expect(data1).to.equal(payload1)
        expect(data2).to.equal(payload2)
        listener2.done = true
        listener1.done && done()
      }

      sut.on('bar', listener1, listener2)
        .create('bar')
        .data(payload1, payload2)
        .emit()
    })

    it('should emit lightweight nodes', function (done) {
      var listener = function (data) {
        expect(data).to.equal(undefined)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .emit()
    })
  })

  describe('Flow Direction', function () {
    it('should flow upstream', function (done) {
      var payload = {}
      var listener = function (data) {
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)
    })

    it('should flow downstream', function (done) {
      var payload = {}
      var listener = function (data) {
        expect(data).to.equal(payload)
        done()
      }
      sut
        .create('sut2')
        .create('sut3')
          .on('bar', listener)

      sut.emit('bar', payload)
    })

    it('should flow from root', function (done) {
      var payload = {}

      var listener1 = function (data) {
        expect(data).to.equal(payload)
        listener1.ok = true
      }
      var listener2 = function (data) {
        expect(data).to.equal(payload)
        listener1.ok && done()
      }
      var sut2 = sut
        .on('bar', listener1)
        .create('sut2')

      sut2.create('sut3')
          .on('bar', listener2)

      sut.emit('bar', payload)
    })

    it('should be unidirectional (upstream)', function (done) {
      var payload = {}
      var numRecipients = 0
      var shouldListen = function (data) {
        expect(data).to.equal(payload)
        numRecipients++
      }
      var shouldNotListen = function (data) {
        done(new Error('incorrect listener was called'))
      }
      var sut3 = sut
        .on('bar', shouldListen)
        .create('sut2')
        .on('bar', shouldListen)
        .create('sut3')
        .on('bar', shouldListen)

      sut3.create('sut4')
          .on('bar', shouldNotListen)

      sut3.create('bar', payload)
        .direction(sut.direction.UPSTREAM)
        .emit()

      setTimeout(function () {
        if (numRecipients !== 3) {
          expect(numRecipients).to.eql(3)
          done('not all listeners got called')
        } else done()
      }, 10)
    })

    it('should be unidirectional (downstream)', function (done) {
      var payload = {}
      var numRecipients = 0
      var shouldListen = function (data) {
        expect(data).to.equal(payload)
        numRecipients++
      }
      var shouldNotListen = function (data) {
        done(new Error('incorrect listener was called'))
      }
      var sut3 = sut
        .on('bar', shouldNotListen)
        .create('sut2')
        .on('bar', shouldNotListen)
        .create('sut3')
        .on('bar', shouldListen)

      sut3.create('sut4')
          .on('bar', shouldListen)

      sut3.create('sut5')
          .on('bar', shouldListen)
      sut3.create('sut6')
          .on('bar', shouldListen)

      sut3.create('bar', payload)
        .direction(sut.direction.DOWNSTREAM)
        .emit()

      setTimeout(function () {
        expect(numRecipients).to.eql(4)
        if (numRecipients !== 4) done('not all listeners got called')
        else done()
      }, 10)
    })
  })

  describe('.matcher() API', function () {
    it('should match by name', function (done) {
      var payload = {}
      var listener = function (data) {
        expect(data).to.equal(payload)
        done()
      }

      sut.on('bar', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)
    })

    it('should not deliver mismatching name', function (done) {
      var payload = {}
      var listener = function (data) {
        done(new Error('incorrect listener was called'))
      }
      sut.on('sut1', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)

      setTimeout(done, 10)
    })
  })
})
