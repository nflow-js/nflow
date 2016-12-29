/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'
var sut

describe('Internal Events', function () {
  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
  })
  describe('parent() API', function () {
    it('should dispatch flow.parent internal event', function (done) {
      var listener = function (newParent, oldParent) {
        expect(newParent).to.equal(null)
        expect(oldParent).to.equal(sut)
        done()
      }

      sut.create('newParent')

      sut
        .create('test')
        .on('flow.parent', listener)
        .parent(null)
    })

    it('should dispatch flow.parent internal event on reparenting', function (done) {
      var listener = function (newParent, oldParent) {
        expect(newParent).to.equal(sut1)
        expect(oldParent).to.equal(sut)
        done()
      }

      var sut1 = sut.create('newParent')

      sut
        .create('test')
        .on('flow.parent', listener)
        .parent(sut1)
    })

    it('should dispatch flow.children.parent internal event', function (done) {
      var listener = function (f, newParent, oldParent) {
        expect(newParent).to.equal(sut1)
        expect(oldParent).to.equal(sut)
        done()
      }

      var sut1 = sut.create('newParent')

      sut
        .on('flow.children.parent', listener)
        .create('test')
        .parent(sut1)
    })

    it('should dispatch flow.children.parent internal event', function (done) {
      var listener = function (f, newParent, oldParent) {
        expect(f.name()).to.equal('test')
        expect(newParent.name()).to.equal('newParent')
        expect(oldParent.name()).to.equal('test2')
        done()
      }

      var sut1 = sut.create('newParent')

      sut
        .on('flow.children.parent', listener)
        .create('test0')
        .create('test1')
        .create('test2')
        .create('test')
        .parent(sut1)
    })
  })

  describe('data() API', function () {
    it('should dispatch flow.data internal event', function (done) {
      var listener = function (newData, oldData) {
        expect(newData).to.equal(data2)
        expect(oldData).to.equal(data1)
        done()
      }
      var data1 = 1
      var data2 = 2
      sut
        .create('test', data1)
        .on('flow.data', listener)
        .data(data2)
    })

    it('should dispatch flow.children.data internal event', function (done) {
      var listener = function (f, newData, oldData) {
        expect(newData).to.equal(data2)
        expect(oldData).to.equal(data1)
        done()
      }
      var data1 = 1
      var data2 = 2

      sut
        .on('flow.children.data', listener)
        .create('test', data1)
        .data(data2)
    })
  })

  describe('create() API', function () {
    it('should dispatch flow.create internal event', function (done) {
      sut
        .on('flow.create', (f) => {
          expect(f.name()).to.equal('test')
          done()
        })
        .create('test')
    })

    it('should dispatch flow.children.create internal event', function (done) {
      sut
        .on('flow.children.create', (f, flowCreated) => {
          expect(f.name()).to.equal('test')
          expect(flowCreated.name()).to.equal('test2')
          done()
        })
        .create('test')
        .create('test2')
    })

    it('should dispatch flow.children.data internal event', function (done) {
      var listener = function (f, newData, oldData) {
        expect(newData).to.equal(data2)
        expect(oldData).to.equal(data1)
        done()
      }
      var data1 = 1
      var data2 = 2

      sut
        .on('flow.children.data', listener)
        .create('test', data1)
        .data(data2)
    })
  })
})
