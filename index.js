/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var http = require('http')

/**
 * Module exports.
 * @public
 */

module.exports = {
  methods: getCurrentNodeMethods() || getBasicNodeMethods(),
  isSafe,
  isIdempotent
}

/**
 * Get 'safe' property of given method
 * @public
 */

function isSafe (method) {
  return getMethodData()[method].safe
}

/**
 * Get 'idempotent' property of given method
 * @public
 */

function isIdempotent (method) {
  return getMethodData()[method].idempotent
}

/**
 * Lazy load method data.
 * @private
 */

var methodData

function getMethodData () {
  if (!methodData) {
    methodData = JSON.parse(require('fs').readFileSync('methods.json'))
  }

  return methodData
}

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods () {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod (method) {
    return method.toLowerCase()
  })
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods () {
  return [
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
}
