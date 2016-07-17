import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'
var sut

describe('Stats API', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })

  describe('stats configuration', function(){

    it('should merge stats', ()=>{
      sut.stats({foo:'bar'})
      sut.stats({foo1:'bar1'})
      expect(sut.stats().foo).to.equal('bar')
      expect(sut.stats().foo1).to.equal('bar1')
    })

    it('should inherit default stats', ()=>{
      sut.stats({
        defaults:{
          'child':{
            foo:'xyz'
          }
        }
      })
      let child = sut.create('child')

      expect(child.stats().foo).to.equal('xyz')
    })

  })

})
