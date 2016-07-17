import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'

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

  describe('guid API', function(){
    it('should have globally unique ID-s', function(){
      var sut1 = testFlow.create('test')
      var sut2 = testFlow.create('test')
      console.log(sut1.guid())
      console.log(sut2.guid())
      expect(sut1.guid()).to.not.equal(sut2.guid())
    })
  })

  describe('.create() API', function(){
    it('should create new flow objects', function(){
      var sut1 = testFlow.create('test')
      var sut2 = testFlow.create('test')
      expect(sut1).to.not.equal(sut2)
    })

    it('should NOT reuse existing flow objects for unnamed flow objects', function(){
      var sut1 = testFlow.create()
      var sut2 = testFlow.create()
      expect(sut1).to.not.equal(sut2)
    })
  })

  describe('.dispose() API', function(){
    it('should detach disposed nodes', function(){
      var sut = testFlow.create('test')
      sut.dispose()
      expect(sut.parent()).to.equal(null)
    })

    it('should not emit events on disposed nodes', function(){
      var sut1 = testFlow.create()
        .on('foo', ()=>{
          assert.fail('should not deliver message on disposed nodes')
        })
      sut1.dispose()
      sut1.emit('foo')
      assert.ok(sut1)
    })

    it('should not emit events on children of disposed nodes', function(){
      var sut1 = testFlow.create()
      sut1.dispose()

      sut1
        .on('foo', ()=>{
          assert.fail('should not deliver message on disposed nodes')
        })

      sut1.emit('foo')
      assert.ok(sut1)
    })

    it('should emit flow.dispose events on all disposed child nodes', function(){
      var sut1 = testFlow.create()

      var child1 = sut1.create().on('flow.dispose', d=>child1.disposed=true)
      var child2 = sut1.create().on('flow.dispose', d=>child2.disposed=true)
      var child3 = child2.create().on('flow.dispose', d=>child3.disposed=true)
      sut1.dispose()
      expect(child1.disposed).to.be.true
      expect(child2.disposed).to.be.true
      expect(child3.disposed).to.be.true
    })
  })

  describe('creating flow objects with data', function(){

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
})
