var svc = require('../src/services');

describe('Services module', function() {
  beforeEach(function() {
    svc.reset(); 
  });

  it('works', function() {
    var callCount = 0;
    svc.put('foo', [], function() {
      callCount++;
      this.foo = 'bar';
    });
    expect(svc.get('foo').foo).toEqual('bar');
    expect(callCount).toEqual(1);
    svc.clear();
    expect(svc.get('foo').foo).toEqual('bar');
    expect(callCount).toEqual(2);
  });

  it('allows dependencies', function() {
    svc.put('foo', [], function() {});
    svc.put('baz', ['foo'], function() {});

    expect(svc.get('baz').foo()).toBe(svc.get('foo'));
  });
});