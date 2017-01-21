var assert = require('assert')
var browserify = tryRequire('browserify')
var istanbul = tryRequire('istanbul')
var methods = null
var path = require('path')
var run = browserify ? describe : describe.skip
var stream = require('stream')
var vm = require('vm')

run('when browserified', function () {
  before(function (done) {
    var b = browserify()
    var c = {}

    // instrument
    if (istanbul && getCoverageGlobal()) {
      b.transform(istanbulify(c))
    }

    // require methods
    b.require(path.join(__dirname, '..'), {
      expose: 'methods'
    })

    // bundle and eval
    b.bundle(function (err, buf) {
      if (err) return done(err)
      var require = vm.runInNewContext(buf.toString(), c)
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

    it('should only have lower-case entries', function () {
      for (var i = 0; i < methods.length; i++) {
        assert(methods[i], methods[i].toLowerCase(), methods[i] + ' is lower-case')
      }
    })
  })
})

function getCoverageGlobal () {
  for (var key in global) {
    if (key.substr(0, 6) === '$$cov_') {
      return global[key]
    }
  }
}

function istanbulify (context) {
  // link coverage
  context.__coverage__ = getCoverageGlobal()

  // browserify transform
  return function (file) {
    var chunks = []
    var instrumenter = new istanbul.Instrumenter()
    var transformer = new stream.Transform()

    // buffer chunks
    transformer._transform = function _transform (data, encoding, callback) {
      chunks.push(data)
      callback()
    }

    // transform on flush
    transformer._flush = function _flush (callback) {
      var contents = Buffer.concat(chunks).toString()
      instrumenter.instrument(contents, file, function (err, output) {
        if (err) return transformer.emit('error', err)
        transformer.push(output)
        transformer.push(null)
        callback()
      })
    }

    return transformer
  }
}

function tryRequire (name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}
