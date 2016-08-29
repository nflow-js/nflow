import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'
var sut

describe('Connection', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('Children API', function(){

    it('should remove detached nodes', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(null)
      expect(sut1.children()).to.eql([sut3])
    })

    it('should re-parent', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut3.children()).to.eql([sut2])
      expect(sut1.children()).to.eql([sut3])
    })

    it('should retrieve children', function(){

      var a = sut.create("test1")
      var b = sut.create("test2")
      var c = sut.create("test3")
      expect(sut.children()).to.eql([a,b,c])
    })

    it('should not retrieve detached children', function(){

      var a = sut.create("test1")
      var b = sut.create("test2")
      var d = sut.create("detached")
      var c = sut.create("test3")
      d.parent(null)
      expect(sut.children()).to.eql([a,b,c])
    })

    it('.all() should return all children recursively', function(){

      var a = sut.create("test1")
      var b = a.create("test2")
      var c = b.create("test3")
      var children = sut.children.all()
      expect(children).to.eql([a,b,c])
    })

    it('.all() should handle circular dependencies', function(){
      var a = sut.create('a')
      var b = a.create('b')
      var c = b.create('c')
      var c1 = b.create('c1')
      a.parent(c)
      var children = b.children.all()
      expect(children.map(e=>e.name())).to.eql(["c","c1","a","b"])
    })

    it('should find child by String', function(){

      var a = sut.create("test1")
      var b = sut.create("test2")
      var c = sut.create("test3")
      var match = sut.children.find("test2")
      expect(match).to.eql(b)
    })

    it('should find child by matcher function', function(){

      var a = sut.create("test1").data(1)
      var b = sut.create("test2").data(2)
      var c = sut.create("test3").data(3)
      var match = sut.children.find(f=>f.data()==2)

      expect(match).to.eql(b)
    })

    it('should find All children by matcher function', function(){

      var a = sut.create("test1").data(1)
      var b = sut.create("test2").data(2)
      var c = sut.create("test3").data(3)
      var match = sut.children.findAll(f=>f.data()>=2)

      expect(match).to.eql([b,c])
    })

    it('should find child by String recursively', function(){

      var a = sut.create("test1")
      var b = a.create("test2")
      var c = b.create("test3")
      var match = sut.children.find("test2", true)
      expect(match).to.eql(b)
    })

    it('should find All children by matcher function recursively', function(){
      var a = sut.create("test1").data(1)
      var b = a.create("test2").data(2)
      var c = b.create("test3").data(3)
      var match = sut.children.findAll(f=>f.data()>=2, true)
      expect(match).to.eql([b,c])
    })


    it('should check if child exists by matcher function', function(){

      var a = sut.create("test1").data(1)
      var b = sut.create("test2").data(2)
      var c = sut.create("test3").data(3)
      var match = sut.children.has(f=>f.data()>=2)

      expect(match).to.be.true
    })

    it('should check if child exists by matcher function recursively', function(){

      var a = sut.create("test1").data(1)
      var b = a.create("test2").data(2)
      var c = b.create("test3").data(3)
      var match1 = sut.children.has(f=>f.data()>=2, false)
      var match2 = sut.children.has(f=>f.data()>=2, true)

      expect(match1).to.be.false
      expect(match2).to.be.true
    })


  })

  describe('parent API', function(){

    it('should return correct parent', function(){
      var sut1 = sut.create('parent')
      var sut2 = sut1.create('child')
      expect(sut2.parent()).to.equal(sut1)
    })

    it('should detach', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      sut2.parent(null)
      expect(sut2.parent()).to.equal(null)
    })

    it('should re-parent', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut2.parent()).to.equal(sut3)
    })
  })


  describe('parents API', function(){

    it('should return parent chain', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')

      expect(sut1.parents()).to.eql([sut])
      expect(sut2.parents()).to.eql([sut1, sut])
      expect(sut3.parents()).to.eql([sut2, sut1, sut])
    })

    it('return correct chain for detached nodes', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(null)
      expect(sut2.parents()).to.eql([])
    })

    it('should return correct chain for re-parented nodes', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut1.create('sut3')
      sut2.parent(sut3)
      expect(sut2.parents()).to.eql([sut3, sut1, sut])
    })

    it('should handle circular references (loop)', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      sut1.parent(sut3)
      expect(sut3.parents()).to.eql([sut2, sut1, sut3])
    })

    it('should handle circular references (loop + leaf)', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      sut1.parent(sut2)
      expect(sut3.parents()).to.eql([sut2, sut1])
    })

    it('should find parent', function(){
      var sut1 = sut.create('sut1')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      var match = sut3.parents.find("sut1")

      expect(match).to.eql(sut1)
    })

    it('should find root', function(){
      var root = sut.create('root').parent(null)
      var sut2 = root.create('sut2')
      var sut3 = sut2.create('sut3')
      var match = sut3.parents.root()

      expect(match).to.eql(root)
    })

    it('should not find sibling as parent', function(){
      var sut1 = sut.create('sut1')
      var notParent = sut1.create('notparent')
      var sut2 = sut1.create('sut2')
      var sut3 = sut2.create('sut3')
      var nomatch = sut3.parents.find("notparent")

      expect(nomatch).to.be.undefined
    })

  })

})
