
var assert = require("assert")
var flow = require('../dist/flow')
var expect = require('chai').expect;
var sut

describe('Internal Events', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('parent() API', function(){
    it('should dispatch flow.parent internal event', function(done){
      var payload = {}
      var listener = function(newParent, oldParent){
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

    it('should dispatch flow.children.parent internal event', function(done){
      var payload = {}
      var listener = function(newParent, oldParent){
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

  })

describe('data() API', function(){
    it('should dispatch flow.data internal event', function(done){
      var payload = {}
      var listener = function(newData, oldData){
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

    it('should dispatch flow.children.data internal event', function(done){
      var payload = {}
      var listener = function(newData, oldData){
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