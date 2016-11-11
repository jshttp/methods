
var parse = require('csv-parse')
var path = require('path')
var request = require('request')
var write = require('./lib/write')

getMethods(writeMethods)

function getMethods (callback) {
  var methods = Object.create(null)

  function onEnd () {
    callback(methods)
  }

  function onMethod (method) {
    methods[method.methodName.toLowerCase()] = {
      idempotent: parseYesNo(method.idempotent),
      safe: parseYesNo(method.safe),
      sources: getRfcLinks(method.reference)
    }
  }

  request('http://www.iana.org/assignments/http-methods/methods.csv')
  .pipe(parse({columns: normalizeHeaders}))
  .on('data', onMethod)
  .on('end', onEnd)
}

function getRfcLinks (str) {
  var tokens = str.split(/\[RFC([0-9]+)|, Section ([0-9.]+)]?/)

  if (tokens.length <= 1) {
    return undefined
  }

  var href = 'https://tools.ietf.org/html/rfc' + tokens[1]
  var links = []

  for (var i = 5; i < tokens.length; i += 3) {
    links.push(href + '#section-' + tokens[i])
  }

  return links
}

function normalizeHeaders (line) {
  return line.map(normalizeHeader)
}

function normalizeHeader (val) {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s, c) {
    return c.toUpperCase()
  })
}

function parseYesNo (str) {
  return str === 'yes'
}

function writeMethods (methods) {
  var file = path.join(__dirname, '..', 'src', 'iana-methods.json')
  write(file, methods)
}
