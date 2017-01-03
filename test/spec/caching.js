/* globals describe, it, beforeEach */
import flow from 'nflow'
import {expect} from 'chai'
var sut

describe('Caching', function () {
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
    let root = (p || sut).create('root')
    let a = root.create('a')
    let b = root.create('b')
    a.create('w')
    a.create('x')
    b.create('y')
    b.create('z')
  }

  let noop = () => {}

  describe('Listener Cache', function () {
    it('should cache new listeners', () => {
      sut.get('w').on('foo', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true})
      sut.get('w').on('foo1', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, foo1: true})
      sut.get('w').on('foo1', null)
      sut.get('z').on('bar', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true})
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
    })

    it('should un-cache removed listeners', () => {
      sut.get('w').on('foo', noop)
      sut.get('z').on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      sut.get('w').on('foo', null)
      expect(sut.on.listenerCache).to.deep.equal({bar: true, baz: true})
      sut.on('baz', null)
      expect(sut.on.listenerCache).to.deep.equal({bar: true})
      sut.get('z').on('bar', null)
      expect(sut.on.listenerCache).to.deep.equal({})
    })

    it('should store local names without any namespace', () => {
      sut.get('w').on('a:foo', noop)
      sut.get('z').on('b:bar', noop)
      sut.on('c:x:baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
    })

    it('should update cache after unparenting', () => {
      sut.get('w').on('foo', noop)
      sut.get('z').on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      sut.get('z').parent(null)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, baz: true})
    })

    it('should update cache after reparenting', () => {
      sut.get('w').on('foo', noop)
      sut.get('z').on('bar', noop)
      sut.on('baz', noop)
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      sut.get('z').parent(sut.get('w'))
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true})
      sut.create('newkid')
        .parent(null)
        .on('new', noop)
        .parent(sut.get('x'))
      expect(sut.on.listenerCache).to.deep.equal({foo: true, bar: true, baz: true, new: true})
    })

    it('should update cache after emitting', () => {
      sut.get('w').on('foo', noop)
      sut.get('z').on('bar', noop)
      sut.on('baz', noop)
      sut.get('z').emit()
      expect(sut.on.listenerCache).to.deep.equal({foo: true, baz: true})
    })

    it('should update cache after disposing', () => {
      sut.get('w').on('foo', noop)
      sut.get('z').on('bar', noop)
      sut.on('baz', noop)
      sut.get('a').dispose()
      expect(sut.on.listenerCache).to.deep.equal({baz: true, bar: true})
    })
  })
})
