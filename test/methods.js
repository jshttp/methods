var assert = require('assert')

describe('methods', function () {
  var http = require('http')
  var methods = require('..')
  if (http.METHODS) {
    it('is a lowercased http.METHODS', function () {
      var lowercased = http.METHODS.map(function (method) {
        return method.toLowerCase()
      })
      assert.deepEqual(lowercased, methods)
    })
  } else {
    it('contains GET, POST, PUT, and DELETE', function () {
      assert.notEqual(methods.indexOf('get'), -1)
      assert.notEqual(methods.indexOf('post'), -1)
      assert.notEqual(methods.indexOf('put'), -1)
      assert.notEqual(methods.indexOf('delete'), -1)
    })

    it('is all lowercase', function () {
      for (var i = 0; i < methods.length; i++) {
        assert(methods[i], methods[i].toLowerCase(), methods[i] + " isn't all lowercase")
      }
    })
  }
})

describe('empty methods', function () {
  it('should get the default methods if http.METHODS === []', function() {
    delete require.cache[require.resolve('http')]
    delete require.cache[require.resolve('..')]
    var http = require('http')
    http.METHODS = []
    var defaultMethods = require('..')
    var defaultValues = [
      'get',
      'post',
      'put',
      'head',
      'delete',
      'options',
      'trace',
      'copy',
      'lock',
      'mkcol',
      'move',
      'purge',
      'propfind',
      'proppatch',
      'unlock',
      'report',
      'mkactivity',
      'checkout',
      'merge',
      'm-search',
      'notify',
      'subscribe',
      'unsubscribe',
      'patch',
      'search',
      'connect'
    ]
    var leng = defaultMethods.length
    assert.equal(defaultMethods.length, defaultValues.length)

    for (var i = 0; i < leng; i++) {
      assert.equal(defaultMethods[i], defaultValues[i])
    }
    
  })
})
