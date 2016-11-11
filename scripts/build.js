
var path = require('path')
var write = require('./lib/write')

// copy IANA methods
write(path.join(__dirname, '..', 'methods.json'), require('../src/iana-methods.json'))
