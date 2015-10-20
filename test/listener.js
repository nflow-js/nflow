
var assert = require("assert")
var flow = require('../dist/flow')
var expect = require('chai').expect;
var sut

describe('Listeners', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('on() API', function(){
    it('should store single listener', function(){
      var listener = function(){}
      sut.on('foo', listener)
      expect(sut.on('foo')).to.eql([listener])  
    })
    
    it('should store multiple listeners', function(){
      var listener1 = function(){}
      var listener2 = function(){}
      sut.on('foo', listener1, listener2)
      expect(sut.on('foo')).to.eql([listener1, listener2])  
    })

    it('should store listeners for Bubble phase', function(){
      var listener = function(){}
      sut.on('foo', listener, sut.direction.UPSTREAM)
      expect(sut.on('foo')).to.eql([])  
      expect(sut.on('foo', sut.direction.UPSTREAM)).to.eql([listener])  
    })
    
    it('should store listeners for Flow phase', function(){
      var listener = function(){}
      sut.on('foo', listener, sut.direction.DOWNSTREAM)
      expect(sut.on('foo')).to.eql([])  
      expect(sut.on('foo', sut.direction.DOWNSTREAM)).to.eql([listener])  
    })
    
    it('return [] for non-existent listeners', function(){
      expect(sut.on('non-existent')).to.eql([])
    })
    
    it('should destroy single listener', function(){
      var listener = function(){}
      sut.on('foo', listener)
      sut.on('foo', null)
      expect(sut.on('foo')).to.eql([])  
    })
    
    it('should store multiple listeners', function(){
      var listener1 = function(){}
      var listener2 = function(){}
      sut.on('foo', listener1, listener2)
      expect(sut.on('foo')).to.eql([listener1, listener2])  
    })

    it('should ignore invalid listeners', function(){
      var listener1 = function(){}
      var listener2 = function(){}
      sut.on('foo', listener1, 'invalid', listener2)
      expect(sut.on('foo')).to.eql([listener1, listener2])  
    })

  })

  

})