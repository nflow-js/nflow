/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'

describe('Caching', function () {
  var sut
  var root
  var a
  var b
  var w
  var x
  var y
  var z

  beforeEach(function () {
    sut = flow
      .create('sut')
      .parent(null)
      .call(tree)
  })

  /**
   * creates a binary tree for testing:
   *       root
   *    a        b
   *  w   x    y   z
   * @param  {Flow} parent optional parent node
   * @return {null}
   */
  let tree = p => {
    root = (p || sut).create('root')
    a = root.create('a')
    b = root.create('b')
    w = a.create('w')
    x = a.create('x')
    y = b.create('y')
    z = b.create('z')
    // skip linting for unused files
    sut + root + a + b + w + x + y + z
  }

  let noop = () => {}

  describe('Listener Cache', function () {
    it('should cache new listeners', () => {
      w.on('foo', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true})
      w.on('foo1', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, foo1: true})
      w.on('foo1', null)
      z.on('bar', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true})
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
    })

    it('should un-cache removed listeners', () => {
      w.on('foo', noop)
      z.on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      w.on('foo', null)
      expect(sut.on.listenerCache).to.deep.equal({bar: true, baz: true})
      sut.on('baz', null)
      expect(sut.on.listenerCache).to.deep.equal({bar: true})
      z.on('bar', null)
      expect(sut.on.listenerCache).to.deep.equal({})
    })

    it('should store local names without any namespace', () => {
      w.on('a:foo', noop)
      z.on('b:bar', noop)
      sut.on('c:x:baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
    })

    it('should update cache after unparenting', () => {
      w.on('foo', noop)
      z.on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      z.parent(null)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, baz: true})
    })

    it('should update cache after reparenting', () => {
      w.on('foo', noop)
      z.on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      z.parent(w)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      sut.create('newkid')
        .parent(null)
        .on('new', noop)
        .parent(sut.get('x'))
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true, new: true})
    })

    it('should update cache after emitting', () => {
      w.on('foo', noop)
      z.on('bar', noop)
      sut.on('baz', noop)
      z.emit()
      expect(sut.on.listenerCache).to.deep.equal({foo: true, baz: true})
    })

    it('should update cache after disposing', () => {
      w.on('foo', noop)
      z.on('bar', noop)
      sut.on('baz', noop)
      a.dispose()
      expect(sut.on.listenerCache).to.deep.equal({baz: true, bar: true})
    })
  })

  describe('Parents Cache', function () {
    it('should update cache after unparenting', () => {
      b.parent(null)
      expect(b.parents()).to.deep.equal([])
    })

    it('should update children\'s cache after unparenting', () => {
      b.parent(null)
      expect(z.parents()).to.deep.equal([b])
    })

    it('should update cache after reparenting', () => {
      b.parent(w)
      expect(b.parents()).to.deep.equal([w, a, root, sut])
    })

    it('should update children\'s cache after reparenting', () => {
      b.parent(w)
      expect(z.parents()).to.deep.equal([b, w, a, root, sut])
    })

    it('should update cache of detached nodes', () => {
      z.emit()
      b.parent(null)
      expect(z.parents()).to.deep.equal([b])
    })
  })
})
