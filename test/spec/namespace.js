/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'
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

  describe('Namespace resolver', function () {
    it('should match generic NS', () => {
      let s = sut
        .create('a')
        .create('bb')
        .create('ccc')
        .create('event')

      expect(s.namespace.match('bb'), 'namespace with no event name').to.be.false
      expect(s.namespace.match('xx:event', 'wrong namespace')).to.be.false
      expect(s.namespace.match('bb:bb:event'), 'duplicate context').to.be.false
      expect(s.namespace.match('ccc:bb:event'), 'reverse context').to.be.false
      expect(s.namespace.match(''), 'no event name').to.be.false
      expect(s.namespace.match(':'), 'no event name').to.be.false
      expect(s.namespace.match('foo'), 'wrong event name').to.be.false

      expect(s.namespace.match('event')).to.be.true
      expect(s.namespace.match('bb:event'), 'partial match').to.be.true
      expect(s.namespace.match('a:bb:ccc:event'), 'full match').to.be.true
      expect(s.namespace.match('a:ccc:event'), 'skipped context match').to.be.true
    })

    it('should match specific NS', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let b1 = a.create('bb1')
      let c = b.create('ccc')
      let d = c.create('event')

      expect(d.namespace.match(a.guid() + ':event')).to.be.true
      expect(d.namespace.match(a.guid() + ':ccc:event'), 'skipped nodes').to.be.true
      expect(d.namespace.match(b1.guid() + ':event'), 'unrelated branch').to.be.false
    })

    it('should match wildcard(*) in NS', () => {
      let a = sut.create('a')
      let b = a.create('bb')
      let b1 = a.create('bb1')
      let c = b.create('ccc')
      let d = c.create('event')

      expect(d.namespace.match(a.guid() + ':*')).to.be.true
      expect(d.namespace.match(b1.guid() + ':*')).to.be.false
      expect(d.namespace.match(a.guid() + ':*:event'), 'skipped nodes').to.be.true
      expect(d.namespace.match('*:event'), 'wildcard branch').to.be.true
    })
  })
})
