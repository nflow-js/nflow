/* globals describe, it, beforeEach */
/* eslint no-unused-expressions: 0 */
import flow from 'nflow'
import {expect} from 'chai'
import assert from 'assert'
var sut

describe('Namespace API', function () {
  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
  })

  describe('Namespace queries', function () {
    it('should return full namespace', () => {
      let ns = sut
        .create('a')
        .create('bb')
        .create('ccc')
        .create('dddd')
        .namespace()

      expect(ns).to.equal('sut:a:bb:ccc:dddd')
    })

    it('.full() API', () => {
      let ns = sut
        .create('a')
        .create('b')
        .create('x:y:foo')
        .namespace.full()
      expect(ns).to.deep.equal([ 'sut', 'a', 'b', 'x', 'y', 'foo' ])
    })

    it('.full() API should return correct NS on orphaned nodes', () => {
      let ns = sut
        .create('a')
        .create('b')
        .create('x:y:foo').parent(null)
        .namespace.full()
      expect(ns).to.deep.equal([ 'x', 'y', 'foo' ])
    })

    it('.full() API should return correct NS on re-parented nodes', () => {
      let a = sut
        .create('a')
        .create('b')
      let ns = sut.create('x:y:foo').parent(a)
        .namespace.full()
      expect(ns).to.deep.equal([ 'sut', 'a', 'b', 'x', 'y', 'foo' ])
    })

    it('.implicit() API', () => {
      let ns = sut
        .create('a')
        .create('bb')
        .create('ccc')
        .create('x:y:dddd')
        .namespace.implicit()
      expect(ns).to.deep.equal([ 'sut', 'a', 'bb', 'ccc' ])
    })

    it('.explicit() API should return correct NS', () => {
      let ns = sut
        .create('a')
        .create('b')
        .create('x:y:foo')
        .namespace.explicit()
      expect(ns).to.deep.equal([ 'x', 'y' ])
    })

    it('.localName() API', () => {
      let ns = sut
        .create('a')
        .create('b')
        .create('x:y:foo')
        .namespace.localName()
      expect(ns).to.deep.equal('foo')
    })
  })

  describe('Namespace Resolver', function () {
    it('should resolve global matches', () => {
      let s = sut
        .create('a')
        .create('bb')
        .create('ccc')
        .create('dddd')

      expect(s.namespace.localise('x')).to.equal('x')
      expect(s.namespace.localise('x:a')).to.equal('x:a')
      expect(s.namespace.localise('x:a:bb')).to.equal('x:a:bb')
    })

    it('should resolve local matches', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let c = b.create('ccc')
      let d = c.create('dddd')

      expect(d.namespace.localise('a:event')).to.equal(a.guid() + ':event')
      expect(d.namespace.localise('ccc:someEvent')).to.equal(c.guid() + ':someEvent')
    })

    it('should not localise listeners without a namespace', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let c = b.create('ccc')
      let d = c.create('dddd')

      expect(d.namespace.localise('a')).to.equal('a')
      expect(d.namespace.localise('x')).to.equal('x')
    })

    it('should localise partial matches', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let c = b.create('ccc')
      let d = c.create('dddd')

      expect(d.namespace.localise('a:x')).to.equal(a.guid() + ':x')
      expect(d.namespace.localise('a:x:ccc')).to.equal(a.guid() + ':x:ccc')
      expect(d.namespace.localise('a:x')).to.equal(a.guid() + ':x')
    })
  })

  let abc = p => (p || sut)
    .create('a')
    .create('b')
    .create('c')

  let xyz = p => (p || sut)
    .create('x')
    .create('y')
    .create('z')

  describe('Sender-side namespace constraints', function () {
    it('a:event -> (a:)event', done => {
      abc().on('event', () => done())
      xyz().emit('a:event')
    })

    it('a:event -> a:event', done => {
      sut.on('a:event', () => done())
      xyz().emit('a:event')
    })

    it('(a:)event -> (a:b:c:)a:event', done => {
      abc().on('a:event', () => done())
      sut.get('a').emit('event')
    })

    it('(a:)event -> (a:b:c:)a:event', done => {
      abc().on('a:event', () => done())
      sut.get('a').emit('event')
    })

    it('a:event -X-> (x:)event', () => {
      xyz().on('event', () => assert.fail('it should not deliver to nodes where the sender\'s explicit namespace is unmatched'))
       .emit('a:event')
    })
    it('(x:)event -X-> a:event', () => {
      xyz().on('a:event', () => assert.fail('it should not deliver to nodes where the receiver\'s explicit namespace is unmatched'))
       .emit('event')
    })

    it('(y:a:)event -X-> (x:a:b:c:)a:event', done => {
      let x = sut.create('x')
      let y = sut.create('y')
      abc(y).on('a:event', () => assert.fail('it should not deliver to `a` from a different branch'))
      abc(x).emit('event')
      done()
    })

    it('(a:b:c):a:event -X-> a:event', done => {
      abc().on('a:event', () => assert.fail('it should not deliver to `a` from a different branch'))
      abc().emit('a:event')
      done()
    })

    it('(y:a:)event -X-> (x:a:b:c:)*:a:event', done => {
      let x = sut.create('x')
      let y = sut.create('y')
      abc(y).on('*:a:event', () => done())
      abc(x).emit('event')
    })

    it('(a:b:c):a:event -X-> *:a:event', done => {
      abc().on('*:a:event', () => done())
      abc().emit('a:event')
    })
  })

  describe('Receiver-side namespace constraints', function () {
    it('should match generic NS', () => {
      let s = sut
        .create('a')
        .create('bb')
        .create('ccc')
        .create('event')

      expect(s.namespace.match(sut, 'bb'), 'namespace with no event name').to.be.false
      expect(s.namespace.match(sut, 'xx:event', 'wrong namespace')).to.be.false
      expect(s.namespace.match(sut, 'bb:bb:event'), 'duplicate context').to.be.false
      expect(s.namespace.match(sut, 'ccc:bb:event'), 'reverse context').to.be.false
      expect(s.namespace.match(sut, ''), 'no event name').to.be.false
      expect(s.namespace.match(sut, ':'), 'no event name').to.be.false
      expect(s.namespace.match(sut, 'foo'), 'wrong event name').to.be.false

      expect(s.namespace.match(sut, 'event')).to.be.true
      expect(s.namespace.match(sut, 'bb:event'), 'partial match').to.be.true
      expect(s.namespace.match(sut, 'a:bb:ccc:event'), 'full match').to.be.true
      expect(s.namespace.match(sut, 'a:ccc:event'), 'skipped context match').to.be.true
    })

    it('should match specific NS', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let b1 = a.create('bb1')
      let c = b.create('ccc')
      let d = c.create('event')

      expect(d.namespace.match(sut, a.guid() + ':event')).to.be.true
      expect(d.namespace.match(sut, a.guid() + ':ccc:event'), 'skipped nodes').to.be.true
      expect(d.namespace.match(sut, b1.guid() + ':event'), 'unrelated branch').to.be.false
    })

    it('should match wildcard(*) in NS', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let b1 = a.create('bb1')
      let c = b.create('ccc')
      let d = c.create('event')

      expect(d.namespace.match(sut, a.guid() + ':*')).to.be.true
      expect(d.namespace.match(sut, b1.guid() + ':*')).to.be.false
      expect(d.namespace.match(sut, a.guid() + ':*:event'), 'skipped nodes').to.be.true
      expect(d.namespace.match(sut, '*:event'), 'wildcard branch').to.be.true
    })
  })
})
