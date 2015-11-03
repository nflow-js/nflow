
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

    it('return undefined for non-existent listeners', function(){
      expect(sut.on('non-existent')).to.be.undefined
    })
    
    it('should destroy single listener', function(){
      var listener = function(){}
      sut.on('foo', listener)
      sut.on('foo', null)
      expect(sut.on('foo')).to.be.undefined  
    })
    
    it('should destroy multiple listeners', function(){
      var listener = function(){}
      var listener1 = function(){}
      sut.on('foo', listener, listener1)
      sut.on('foo', null)
      expect(sut.on('foo')).to.be.undefined  
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
      try{
        sut.on('foo', listener1, 'invalid', listener2)
      }
      catch(e){
        expect(e).to.be.an.error
      }
      expect(sut.on('foo')).to.be.undefined  
    })

  })

  

})