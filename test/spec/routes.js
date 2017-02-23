/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'

let noop = () => {}
var sut

describe('Routes', function () {
  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
  })
  describe('route.upstream() API', function () {
    it('should return all upstream nodes', function () {
      var f = sut
        .create('a')
        .create('b')
        .create('c')
        .create('d')

      var route = f.emit.route.UPSTREAM(f, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['d', 'c', 'b', 'a', 'sut'])
    })

    it('should not return unrelated nodes', function () {
      var b = sut
        .create('a')
        .create('b')

      b.create('x')
      var f = b.create('c')
        .create('d')

      f.create('z')

      var route = f.emit.route.UPSTREAM(f, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['d', 'c', 'b', 'a', 'sut'])
    })

    it('should record route to recipients', function () {
      sut.on('test', noop)
      var a = sut.create('a')
      var b = sut.create('b')
      a.create('c')
      b.create('e')

      var d = b.emit.upstream('test')

      var recipient = d.emit.recipients[0]
      var recipientMap = recipient.route.map(f => f.flow.name())
      expect(recipient.flow).to.eql(sut)
      expect(recipientMap.join()).to.eql('test,b,sut')
    })

    it('should not deliver to unreachable recipients', function () {
      sut
      var a = sut.create('a')
      var b = sut.create('b')
      a.create('c').on('test', noop)
      b.create('e').on('test', noop)

      var d = b.emit.upstream('test')

      var recipients = d.emit.recipients
      expect(recipients.length).to.equal(0)
    })
  })

  describe('route.current() API', function () {
    it('should return event and current node', function () {
      var f = sut
        .create('a')
        .create('b')
        .create('c')
        .emit('d')

      var route = f.emit.route.CURRENT(f, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['d', 'c'])
    })

    it('should not return unrelated nodes', function () {
      var b = sut
        .create('a')
        .create('b')

      b.create('x')
      var f = b.create('c')
        .emit('d')

      f.create('z')

      var route = f.emit.route.CURRENT(f, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['d', 'c'])
    })

    it('should record route to recipients', function () {
      sut.on('test', noop)
      var a = sut.create('a')
        .on('test', noop)
      var d = a.emit.current('test')

      var recipient = d.emit.recipients[0]
      var recipientMap = recipient.route.map(f => f.flow.name())
      expect(recipient.flow).to.eql(a)
      expect(recipientMap.join()).to.eql('test,a')
    })
  })

  describe('route.downstream() API', function () {
    it('should return child nodes', function () {
      var f = sut
        .create('a')

      var g = f.emit('x')

      g.create('x0')

      f.create('b')
        .create('c')
        .emit('d')
      f.create('e')

      var route = g.emit.route.DOWNSTREAM(g, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['x', 'x0', 'a', 'b', 'c', 'e'])
    })

    it('should not return unrelated nodes', function () {
      var b = sut
        .create('a')
        .create('b')

      b.create('b0')
      var f = b.create('b1')
        .emit('c')

      f.create('z')

      var route = f.emit.route.DOWNSTREAM(f, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['c', 'z', 'b1'])
    })
    it('should record route to recipients', function () {
      var a = sut.create('a')
      var b = sut.create('b')
      var c = a.create('c')
        .on('test', noop)
      var e = b.create('e')
        .on('test', noop)
      var d = sut.emit.downstream('test')

      var cTest = d.emit.recipients[0]
      var eTest = d.emit.recipients[1]
      var cMap = cTest.route.map(f => f.flow.name())
      var eMap = eTest.route.map(f => f.flow.name())
      expect(cTest.flow).to.eql(c)
      expect(eTest.flow).to.eql(e)
      expect(cMap.join()).to.eql('test,sut,a,c')
      expect(eMap.join()).to.eql('test,sut,b,e')
    })
  })

  describe('route.default() API', function () {
    it('should return child nodes', function () {
      var a = sut.create('a')
      var b = sut.create('b')
      a.create('c')
      b.create('e')
      var d = b.create('d')

      var route = d.emit.route.DEFAULT(d, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.deep.eql(['d', 'b', 'sut', 'a', 'c', 'e'])
    })

    it('should not return unrelated nodes', function () {
      var a = sut.create('a')
      var b = sut.create('b')
      b.parent(null)
      var route = a.emit.route.DEFAULT(a, true)
      var map = route.map(f => f.flow.name())
      expect(map).to.eql(['a', 'sut'])
    })
    it('should record upstream route to recipients', function () {
      var a = sut.create('a')
      var b = a.create('b').on('test', () => {})
      var c = b.create('c')
      var d = c.create('d')

      var test = d.emit('test')

      var testRecipients = test.emit.recipients[0]
      var map = testRecipients.route.map(f => f.flow.name())
      expect(testRecipients.flow).to.eql(b)
      expect(map.join()).to.eql('test,d,c,b')
    })

    it('should record route to recipients', function () {
      var a = sut.create('a')
      var b = a.create('b')
      var c0 = b.create('c0').on('test', noop)
      var c = b.create('c')
      var d = c.create('d')

      var test = d.emit('test')

      var testRecipients = test.emit.recipients[0]
      var map = testRecipients.route.map(f => f.flow.name())
      expect(testRecipients.flow).to.eql(c0)
      expect(map.join()).to.eql('test,d,c,b,a,sut,a,b,c0')
    })

    it('should record route to detached recipients', function () {
      var a = sut.create('a').on('test', noop)
      var b = a.create('b').emit()
      b.create('c0').on('test', noop)
      var c = b.create('c')
      var d = c.create('d')

      var test = d.emit('test')

      var testRecipients0 = test.emit.recipients[0]
      var testRecipients1 = test.emit.recipients[1]
      var map0 = testRecipients0.route.map(f => f.flow.name())
      var map1 = testRecipients1.route.map(f => f.flow.name())
      expect(testRecipients0.flow.name()).to.eql('c0')
      expect(testRecipients1.flow.name()).to.eql('a')
      expect(map0.join()).to.eql('test,d,c,b,c0')
      expect(map1.join()).to.eql('test,d,c,b,a')
    })
  })
})
