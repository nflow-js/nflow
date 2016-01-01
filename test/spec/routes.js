import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'
var sut

describe('Routes', function(){
  beforeEach(function(){
    sut = flow
      .create('sut')
      .parent(null)

  })
  describe('route.upstream() API', function(){
    it('should return all upstream nodes', function(){
      var f = sut
        .create('a')
        .create('b')
        .create('c')
        .create('d')
      
      var route = f.emit.route.UPSTREAM(f)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['d','c','b','a','sut'])  
    })

    it('should not return unrelated nodes', function(){
      var b =sut
        .create('a')
        .create('b')

      b.create('x')
      var f = b.create('c')
        .create('d')

      f.create('z')
      
      var route = f.emit.route.UPSTREAM(f)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['d','c','b','a','sut'])  
    })

    it('should record route to recipients', function(){
      sut.on('test', ()=>{})
      var a = sut.create('a')
      var b = sut.create('b')
      var c = a.create('c')
      var e = b.create('e')

      var d = b.emit.upstream('test')
      
      var recipient = d.emit.recipients[0]
      var recipientMap = recipient.route.map(f=>f.name())
      expect(recipient.flow).to.eql(sut)  
      expect(recipientMap.join()).to.eql(['sut','b','test'].join())
    })
  })

  describe('route.none() API', function(){
    it('should return event and current node', function(){
      var f = sut
        .create('a')
        .create('b')
        .create('c')
        .emit('d')
      
      var route = f.emit.route.NONE(f)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['d','c'])  
    })

    it('should not return unrelated nodes', function(){
      var b =sut
        .create('a')
        .create('b')

      b.create('x')
      var f = b.create('c')
        .emit('d')
        
      f.create('z')
      
      var route = f.emit.route.NONE(f)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['d','c'])  
    })

    it('should record route to recipients', function(){
      sut.on('test', ()=>{})
      var a = sut.create('a')
        .on('test', ()=>{})
      var d = a.emit.none('test')
      
      var recipient = d.emit.recipients[0]
      var recipientMap = recipient.route.map(f=>f.name())
      expect(recipient.flow).to.eql(a)  
      expect(recipientMap.join()).to.eql(['a', 'test'].join())
    })
    
  })

  describe('route.downstream() API', function(){
    it('should return child nodes', function(){
      var f = sut
        .create('a')
      
      var g = f.emit('x')

      g.create('x0')

      f.create('b')
        .create('c')
        .emit('d')
      f.create('e')

      var route = g.emit.route.DOWNSTREAM(g)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['x', 'x0', 'a', 'b', 'c', 'e' ])  
    })

    it('should not return unrelated nodes', function(){
      var b =sut
        .create('a')
        .create('b')

      b.create('b0')
      var f = b.create('b1')
        .emit('c')
        
      f.create('z')
      
      var route = f.emit.route.DOWNSTREAM(f)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['c', 'z', 'b1'])  
    })
    it('should record route to recipients', function(){
      var a = sut.create('a')
      var b = sut.create('b')
      var c = a.create('c')
        .on('test', ()=>{})
      var e = b.create('e')
        .on('test', ()=>{})
      var d = sut.emit.downstream('test')
      
      var cTest = d.emit.recipients[0]
      var eTest = d.emit.recipients[1]
      var cMap = cTest.route.map(f=>f.name())
      var eMap = eTest.route.map(f=>f.name())
      expect(cTest.flow).to.eql(c)  
      expect(eTest.flow).to.eql(e)
      expect(cMap.join()).to.eql(['c','a','sut','test'].join())
      expect(eMap.join()).to.eql(['e','b','sut','test'].join())
    })
  })

  describe('route.default() API', function(){
    it('should return child nodes', function(){
      var a = sut.create('a')
      var b = sut.create('b')
      var c = a.create('c')
      var e = b.create('e')
      var d = b.create('d')

      var route = d.emit.route.DEFAULT(d)
      var map = route.map(f=>f.flow.name())
      expect(map.join()).to.eql(['d', 'b', 'sut', 'a', 'c', 'e' ].join())  
    })

    it('should not return unrelated nodes', function(){
      var a = sut.create('a')
      var b = sut.create('b')
      b.parent(null)
      var route = a.emit.route.DEFAULT(a)
      var map = route.map(f=>f.flow.name())
      expect(map).to.eql(['a', 'sut'])  
    })
    it('should record route to recipients', function(){
      var a = sut.create('a')
      var b = sut.create('b')
      var c = a.create('c')
        .on('test', ()=>{})
      var e = b.create('e')
        .on('test', ()=>{})
      var d = b.emit('test')
      
      var cTest = d.emit.recipients[0]
      var eTest = d.emit.recipients[1]
      var cMap = cTest.route.map(f=>f.name())
      var eMap = eTest.route.map(f=>f.name())
      expect(cTest.flow).to.eql(c)  
      expect(eTest.flow).to.eql(e)
      expect(cMap.join()).to.eql(['c','a','sut','b','test'].join())
      expect(eMap.join()).to.eql(['e','b','sut','b','test'].join())
    })

    describe('foo', ()=>{

    it('should traverse events', function(){
      sut.on('test', ()=>{})
      var a = sut.create('a')
        .on('test', ()=>{ })

      var test = a
        .emit('b')
        .emit('c')
        .emit('test')

       var route = test.emit.route.DEFAULT(test)
       var map = route.map(f=>f.flow.name())
       console.log(map)
       expect(map.join()).to.eql('test,c,b,a,sut')
    })
    it('should record route to upstream recipients', function(){
      
      var a = sut.create('a')
        .on('test', ()=>{})

      var test = a
        .emit('b')
        .emit('c')
        .emit('test')
      console.log(test.emit.recipients)
      var recipient = test.emit.recipients[0]
      var recipientMap = recipient.route.map(f=>f.name())
      expect(recipient.flow).to.eql(a)
      expect(recipientMap.join()).to.eql('a,b,c,test')
    })

    })

  })
})