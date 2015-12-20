import flow from 'flow'
import assert from 'assert'
import {expect} from 'chai'
var sut

describe('Logging', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('Flow Logging', ()=>{
    it('Should toString', ()=>{
      expect(String(sut)).to.be.contain("sut")
    })

    it('Should use global logger', (done)=>{
      var test = sut.create("test")
      flow.logger((flow, name, newData, oldData)=>{
        if (test.done) return;
        test.done = true
        expect(flow).to.eql(test)
        done()
      })
      test.parent(null)

    })

  })
})