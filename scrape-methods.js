var fs = require('fs')
var request = require('request')
var parse = require('csv-parse')

request('https://www.iana.org/assignments/http-methods/methods.csv', function (err, response, body) {
  if (err) throw err

  parse(body, { columns: true }, function (err, rows) {
    if (err) throw err

    var methodData = {}

    rows.forEach(function (row) {
      methodData[row['Method Name'].toLowerCase()] = {
        safe: row.Safe === 'yes',
        idempotent: row.Idempotent === 'yes'
      }
    })

    fs.writeFile('methods.json', JSON.stringify(methodData))
  })
})
