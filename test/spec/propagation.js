import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'
var sut

describe('Event Propagation', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  
  describe('Flow stopPropagation()', function(){
    
    it('should stop event delegation', function(done){
      function shouldCall(){
        this.stopPropagation()
      }
      function shouldNotCall(){
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('a') // parent
        .on('test', shouldNotCall)
        .create('b')
        .on('test', shouldCall)
        .create('c')
        .emit("test")
      
      setTimeout(done, 10)
    })

    it('should stop event delivery on same listener', function(done){
      function shouldCall(){
        this.stopPropagation()
      }
      function shouldNotCall(){
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('b')
        .on('test', shouldCall, shouldNotCall)
        .create('c')
        .emit("test")
      
      setTimeout(done, 10)
    })

    it('should still emit events on stopped nodes', function(done){
      function shouldCall(){
        done()
      }

      var a = sut
        .create('b')
        .on('test',shouldCall)
        .stopPropagation()
        .create('c')
        .stopPropagation()
        .create('d')
        .emit("test")
      
      
    })
    
    

  })

  describe('Flow stopPropagation.current()', function(){
    
    function stopCurrent(){
      this.stopPropagation.current()
    }

    it('should accept stopPropagation.current()', function(done){
      var calls = 0
      function shouldCall(){
        calls++
      }
      function shouldNotCall(){
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
      
      sut.emit("test")
      expect(calls).to.equal(6)

      setTimeout(done, 10)
    })

    it('should accept stopPropagation("current")', function(done){
      var calls = 0
      function shouldCall(){
        calls++
      }
      function shouldNotCall(){
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('a') // parent
        .on('test', shouldCall, shouldCall)
      var b = a.create('b')
        .on('test', function(){ this.stopPropagation('current')}, shouldNotCall, shouldNotCall)
      
      b.create('b')
        .on('test', shouldCall, shouldCall)
      
      b.create('c')
        .on('test', shouldCall, shouldCall)
      
      sut.emit("test")
      expect(calls).to.equal(6)

      setTimeout(done, 10)
    })
    
    it('stopPropagation.current() should work in the middle of the propagation chain', function(done){
      var calls = 0
      function shouldCall(){
        calls++
      }
      function shouldNotCall(){
        done('stopped event should not call subsequent listeners')
      }

      var a = sut
        .create('a') // parent
        .on('test', shouldCall
                  , function(){ this.stopPropagation('current')}
                  , shouldNotCall
                  , shouldNotCall)
      
      sut.emit("test")
      expect(calls).to.equal(1)

      setTimeout(done, 10)
    })

    
    

  })

  

})