
var assert = require("assert")
var flow = require('../dist/flow')
var expect = require('chai').expect;
var testFlow
describe('Construction', function(){
  
  beforeEach(function(){
    testFlow = flow
      .create('sut')
      .parent(null)
  })

  describe('guid API', function(){
    it('should create unique guids', function(){
      var sut1 = testFlow.create()   
      var sut2 = testFlow.create()   
      expect(sut1.guid()).to.not.equal(sut2.guid())
    })
  })

  describe('name API', function(){
    it('should store name', function(){
      var sut = testFlow.create('test')   
      expect(sut.name()).to.equal('test')
    })
  })

  describe('data API', function(){

    it('should default to undefined', function(){
      var sut = testFlow.create('test')
      expect(sut.data()).to.equal(undefined)
    })

    it('should store null', function(){
      var sut = testFlow.create('test', null)
      expect(sut.data()).to.equal(null)
    })

    it('should store falsy data', function(){
      var sut = testFlow.create('test', 0)
      expect(sut.data()).to.equal(0)
      
      var sut = testFlow.create('test', false)
      expect(sut.data()).to.equal(false)

      var sut = testFlow.create('test', '')
      expect(sut.data()).to.equal('')
    })

    it('should store single data object', function(){
      var data1 = {}
      var sut = testFlow.create('test', data1)
      expect(sut.data()).to.equal(data1)
    })

    it('should store multiple data objects', function(){
      var data1 = {}
      var data2 = {}
      var data3 = {}
      var sut = testFlow.create('test', data1, data2, data3)
      expect(sut.data()).to.eql([data1, data2, data3])
    })

  })

   describe('parent API', function(){

    it('should return correct parent', function(){
      var sut1 = testFlow.create('parent')
      var sut2 = sut1.create('child')
      console.log("sut2's parent:", sut2.parent().name())
      expect(sut2.parent()).to.equal(sut1)
    })
    
    it('should detach', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      sut2.parent(null)
      expect(sut2.parent()).to.equal(null)
    })

    it('should re-parent', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut2.parent()).to.equal(sut3)
    })
  })

  describe('children API', function(){

    it('should return child nodes', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')

      expect(sut1.children()).to.eql([sut2,sut3])
    })
    
    it('should remove detached nodes', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(null)
      expect(sut1.children()).to.eql([sut3])
    })

    it('should re-parent', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut3.children()).to.eql([sut2])
      expect(sut1.children()).to.eql([sut3])
    })
  }) 

  describe('parents API', function(){

    it('should return parent chain', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')

      expect(sut1.parents()).to.eql([testFlow])
      expect(sut2.parents()).to.eql([sut1, testFlow])
      expect(sut3.parents()).to.eql([sut2, sut1, testFlow])
    })
    
    it('return correct chain for detached nodes', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(null)
      expect(sut2.parents()).to.eql([])
    })

    it('should return correct chain for re-parented nodes', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut2.parents()).to.eql([sut3, sut1, testFlow])
    })

    it('should handle circular references (loop)', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      sut1.parent(sut3)
      expect(sut3.parents()).to.eql([sut2, sut1, sut3])
    })

    it('should handle circular references (loop + leaf)', function(){
      var sut1 = testFlow.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      sut1.parent(sut2)
      expect(sut3.parents()).to.eql([sut2, sut1])
    })

  }) 
  

})