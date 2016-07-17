import flow from 'nflow'
import assert from 'assert'
import {expect} from 'chai'

var sut

describe('Logging', function(){
  beforeEach(function(){
    flow.logger.reset()
    sut = flow
      .create('sut')
      .parent(null)

  })

  describe('Flow Logging', ()=>{

    it('Should toString', ()=>{
      expect(String(sut)).to.be.contain("sut")
    })

    it('Should expose version', ()=>{
      expect(sut.version).to.exist
      expect(sut.version).to.equal(VERSION)
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
  describe('toObj() API', ()=>{
    it('Should log all properties', ()=>{
      expect(sut.toObj()).to.have.property('name', 'sut');
      expect(sut.toObj()).to.have.property('guid', sut.guid());
      expect(sut.toObj()).to.have.property('status', sut.status());
    })
    it('Should log listeners', ()=>{
      sut
        .on('foo',()=>{})
        .on('bar',()=>{},function namedFunction(){})

      expect(sut.toObj()).to.have.deep.property('listeners.foo');
      expect(sut.toObj()).to.have.deep.property('listeners.bar');

      expect(sut.toObj().listeners.bar).to.contain('function')
      expect(sut.toObj().listeners.bar).to.contain('namedFunction')
    })
    it('Should log filtered properties', ()=>{
      expect(sut.toObj('name', 'guid')).to.have.property('name', 'sut');
      expect(sut.toObj('name', 'guid')).to.have.property('guid', sut.guid());
      expect(sut.toObj('name', 'guid')).not.to.have.property('status');
    })

  })
  describe('Remote Logger API', ()=>{

    it('Should use remote logger', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.flow.guid).to.eql(test.guid())
        done()
      },true)
      test.parent(null)
    })

    it('Should log .create() API', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        expect(log.action).to.equal('create')
        expect(log.flow.name).to.equal('test')
        expect(log.d.name).to.equal('bar')
        done()
      },true)
      test.create('bar')
    })

    it('Should log .create() API with data', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        expect(log.d.name).to.equal('bar')
        expect(log.d.data).to.equal('"data1"')
        done()
      },true)
      test.create('bar','data1')
    })

    it('Should log .create() API with multi data', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        expect(log.d.name).to.equal('bar')
        expect(log.d.data).to.equal('["data1","data2"]')
        done()
      },true)
      test.create('bar','data1', 'data2')
    })

    it('Should log .name() API', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        expect(log.action).to.equal('name')
        expect(log.d).to.equal('"bar"')
        expect(log.d0).to.equal('"test"')
        done()
      },true)
      test.name('bar')
    })

    it('Should not log ignored nodes', ()=>{
      var test = sut.create("test")
        .stats({ignore:true})
      flow.logger(log=>{
        assert.fail('should not log ignored nodes')
      },true)
      test.name('bar')

    })
    it('Should not log children of ignored nodes', ()=>{
      var test = sut.create("test")
        .stats({ignore:true})
        .create('test1')
      flow.logger(log=>{
        assert.fail('should not log ignored nodes')
      },true)
      test.name('bar')

    })


    it('Should log .data(x) API', (done)=>{
      var test = sut.create("test", "foo")
      flow.logger(log=>{
        expect(log.action).to.equal('data')
        expect(log.d).to.equal('"bar"')
        expect(log.d0).to.equal('"foo"')
        done()
      },true)
      test.data('bar')
    })
    it('Should log .data(...args) API', (done)=>{
      var test = sut.create("test", "foo","bar")
      flow.logger(log=>{
        expect(log.action).to.equal('data')
        expect(log.d).to.equal('["dog","cat"]')
        expect(log.d0).to.equal('["foo","bar"]')
        flow.logger.reset()
        done()
      },true)
      test.data('dog','cat')
    })
    it('Should log unparenting (.parent(null))', (done)=>{
      var test = sut.create("test", "foo")
      flow.logger(log=>{
        expect(log.action).to.equal('parent')
        expect(log.d).to.equal(undefined)
        expect(log.d0.name).to.equal('sut')
        flow.logger.reset()
        done()
      },true)
      test.parent(null)
    })

    it('Should log reparenting (.parent(node))', (done)=>{
      var test = sut.create("test", "foo")
      var test2 = sut.create('test2')
      flow.logger(log=>{
        expect(log.action).to.equal('parent')
        expect(log.d.name).to.equal('test2')
        expect(log.d0.name).to.equal('sut')
        flow.logger.reset()
        done()
      },true)
      test.parent(test2)
    })
    it('Should log .emit() API', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{

        expect(log.action).to.equal('emit')
        expect(log.flow.name).to.equal('sut')
        expect(log.d.name).to.equal('test')
        flow.logger.reset()
        done()
      },true)
      test.emit()
    })
    it('Should log .emit("foo") API', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (log.action=='create') return;
        expect(log.action).to.equal('emit')
        expect(log.flow.name).to.equal('test')
        expect(log.d.name).to.equal('foo')
        flow.logger.reset()
        done()
      },true)
      test.emit('foo')
    })

    it('Should log .emitted("foo") API', (done)=>{
      var test = sut.create("test")
        .on('foo',()=>{

          flow.logger(log=>{
            let recipient = log.d.recipients[0]
            expect(log.action).to.equal('emitted')
            expect(log.flow.name).to.equal('test')
            expect(log.d.name).to.equal('foo')
            expect(recipient.flow.name).to.equal('test')
            expect(recipient.route.map(f=>f.flow.name).join())
              .to.equal('foo,test')
            flow.logger.reset()
            done()
          },true)

        })
      test.emit('foo')
    })
    it('Should log .direction("foo") API', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        expect(log.action).to.equal('direction')
        expect(log.flow.name).to.equal('test')
        expect(log.d).to.equal('"UPSTREAM"')
        expect(log.d0).to.equal('"DEFAULT"')
        flow.logger.reset()
        done()
      },true)
      test.direction('UPSTREAM')
    })
  })
  describe('Remote Log Serialiser', ()=>{
    it('Should serialise number', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('55')
        done()
      },true)
      test.data(55)
    })
    it('Should serialise String', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('"hello"')
        done()
      },true)
      test.data('hello')
    })
    it('Should serialise Object', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('{"foo":"bar"}')
        done()
      },true)
      test.data({foo:'bar'})
    })
    it('Should serialise recursive Objects', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('{"foo":{"o":"*Recursive0"}}')
        done()
      },true)
      let o = {foo:{}}
      o.foo.o = o
      test.data(o)
    })
    it('Should serialise duplicate Objects', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('{"foo":{},"bar":"*Recursive1"}')
        done()
      },true)
      let o = {foo:{}}
      o.bar = o.foo

      test.data(o)
    })
    it('Should serialise Array', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('[3,"four",5]')
        done()
      },true)
      test.data([3,'four',5])
    })
    it('Should serialise named Function', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('"function foo(arg,arg){...}"')
        done()
      },true)
      test.data(function foo(a,b){})
    })
    it('Should serialise Date', (done)=>{
      var test = sut.create("test")
      flow.logger(log=>{
        if (test.done) return;
        test.done = true
        expect(log.d).to.eql('"1970-01-01T00:00:00.000Z"')
        done()
      },true)
      test.data(new Date(0))
    })
  })
})
