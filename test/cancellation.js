
var assert = require("assert")
var flow = require('../dist/flow')
var expect = require('chai').expect;
var sut

describe('Cancellation', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('Flow Cancellation', function(){
    it('parent node should cancel all child nodes', function(){
      var a = sut.create("a") // parent
        , a1 = a.create("a1") // parent's sibling
        , b = a.create("b")   // SUT
        , b1 = a.create("b1") // sibling
        , c = b.create("c")   // child
        , c1 = b.create("c1") // child
        , d = c.create("d")   // grandchild

      b.cancel()

      //falsy
      expect(a.isCancelled()).to.be.false
      expect(a1.isCancelled()).to.be.false
      expect(sut.isCancelled()).to.be.false
      expect(b1.isCancelled()).to.be.false

      //truthy
      expect(b.isCancelled()).to.be.true
      expect(c.isCancelled()).to.be.true
      expect(c1.isCancelled()).to.be.true
      expect(d.isCancelled()).to.be.true

    })
    
  })

  

})