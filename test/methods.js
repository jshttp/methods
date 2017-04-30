var http = require('http')
var assert = require('assert')
var methods = require('..')

describe('methods', function () {
  if (http.METHODS) {
    it('is a lowercased http.METHODS', function () {
      var lowercased = http.METHODS.map(function (method) {
        return method.toLowerCase()
      })
      assert.deepEqual(lowercased, methods.methods)
    })
  } else {
    it('contains GET, POST, PUT, and DELETE', function () {
      assert.notEqual(methods.methods.indexOf('get'), -1)
      assert.notEqual(methods.methods.indexOf('post'), -1)
      assert.notEqual(methods.methods.indexOf('put'), -1)
      assert.notEqual(methods.methods.indexOf('delete'), -1)
    })

    it('is all lowercase', function () {
      for (var i = 0; i < methods.methods.length; i++) {
        assert(methods.methods[i], methods.methods[i].toLowerCase(), methods.methods[i] + " isn't all lowercase")
      }
    })
  }

  it('isSafe returns safe property', function () {
    assert.equal(methods.isSafe('get'), true, 'GET should be safe')
    assert.equal(methods.isSafe('post'), false, 'POST should be not safe')
    assert.equal(methods.isSafe('put'), false, 'PUT should be not safe')
    assert.equal(methods.isSafe('delete'), false, 'DELETE should be not safe')
  })

  it('isIdempotent returns idempotent property', function () {
    assert.equal(methods.isIdempotent('get'), true, 'GET should be idempotent')
    assert.equal(methods.isIdempotent('post'), false, 'POST should be not idempotent')
    assert.equal(methods.isIdempotent('put'), true, 'PUT should be idempotent')
    assert.equal(methods.isIdempotent('delete'), true, 'DELETE should be idempotent')
  })
})
