
var assert = require("assert")
var flow = require('../dist/flow')
var expect = require('chai').expect;
var sut

describe('Dispatchers', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('.emit() API', function(){

    it('should emit new node', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .emit('bar', payload)
      
    })

    it('should emit current node', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .data(payload)
        .emit()
    })

    it('should deliver multiple payloads', function(done){
      var payload1 = {}
      var payload2 = {}
      var listener = function(data1, data2){
        expect(data1).to.equal(payload1)
        expect(data2).to.equal(payload2)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .data(payload1, payload2)
        .emit()
    })

    it('should emit lightweight nodes', function(done){
      var listener = function(data){
        expect(data).to.equal(undefined)
        done()
      }
      sut.on('bar', listener)
        .create('bar')
        .emit()
    })
  })
    
  describe('Flow Direction', function(){

    it('should flow upstream', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal(payload)
        done()
      }
      sut.on('bar', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)
    })

    it('should flow downstream', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal(payload)
        done()
      }
      sut
        .create('sut2')
        .create('sut3')
          .on('bar', listener)
      
      sut.emit('bar', payload)

    })

    it('should flow from root', function(done){
      var payload = {}
      
      var listener1 = function(data){
        expect(data).to.equal(payload)
        listener1.ok=true

      }
      var listener2 = function(data){
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


    it('should be unidirectional (upstream)', function(done){
      var payload = {}
      var numRecipients = 0
      var shouldListen = function(data){
        expect(data).to.equal(payload)
        numRecipients++
      }
      var shouldNotListen = function(data){
        done(new Error('incorrect listener was called'))
      }
      var sut3= sut
        .direction(sut.direction.UPSTREAM)
        .on('bar', shouldListen)
        .create('sut2')
        .on('bar', shouldListen)
        .create('sut3')
        .on('bar', shouldListen)
        
      sut3.create('sut4')
          .on('bar', shouldNotListen)

      sut3.emit('bar', payload)
      setTimeout(function(){
        if (numRecipients!=3) done('not all listeners got called')
        else done()
      },10)
    })

    it('should be unidirectional (downstream)', function(done){
      var payload = {}
      var numRecipients = 0
      var shouldListen = function(data){
        expect(data).to.equal(payload)
        numRecipients++
      }
      var shouldNotListen = function(data){
        done(new Error('incorrect listener was called'))
      }
      var sut3= sut
        .direction(sut.direction.DOWNSTREAM)
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

      sut3.emit('bar', payload)
      setTimeout(function(){
        if (numRecipients!=4) done('not all listeners got called'+numRecipients)
        else done()
      },10)
    })

  })

  describe('.matcher() API', function(){

    it('should match by name', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal(payload)
        done()
      }

      sut.on('bar', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)
    })

    it('should not deliver mismatching name', function(done){
      var payload = {}
      var listener = function(data){
        done(new Error('incorrect listener was called'))
      }
      sut.on('sut1', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', payload)

      setTimeout(done,10)
    })
    
    it('should use custom matcher', function(done){
      var payload = {}
      var listener = function(data){
        expect(data).to.equal('dog')
        done()
      }
      sut
        .matcher(function(flow,name){
          return flow.data()=='dog'
        })
        .on('bar', listener)
        .create('sut2')
        .create('sut3')
        .emit('bar', 'dog')
    })

    it('should not deliver mismatching nodes using custom matcher', function(done){
      var payload = {}
      var listener = function(data){
        done(new Error('incorrect listener was called'))
      }
      sut.on('sut1', listener)
        .matcher(function(flow,name){
          return flow.data()=='dog'
        })
        .create('sut2')
        .create('sut3')
        .emit('bar', 'cat')

      setTimeout(done,10)
    })


  })


})