var assert = require('assert')
var browserify = tryRequire('browserify')
var http = require('http')
var methods = null
var path = require('path')
var run = browserify ? describe : describe.skip

run('when browserified', function () {
  before(function (done) {
    var b = browserify()

    // require methods
    b.require(path.join(__dirname, '..'), {
      expose: 'methods'
    })

    // bundle and eval
    b.bundle(function (err, buf) {
      var require = eval(buf.toString())
      methods = require('methods')
      done()
    })
  })

  describe('methods', function () {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(function (method) {
      it('should contain "' + method + '"', function () {
        assert.notEqual(methods.indexOf(method), -1)
      })
    })

    it('should only have lower-case entries', function() {
      for (var i = 0; i < methods.length; i ++) {
        assert(methods[i], methods[i].toLowerCase(), methods[i] + ' is lower-case')
      }
    })
  })
})

function tryRequire(name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}
