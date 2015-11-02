var tmpdir = require('osenv').tmpdir()
var first = require('first-match')
var path = require('path')
var fs = require('fs')

module.exports = getName

function getName(prefix) {
  prefix = prefix || 'quicktmp'

  return function getName(retries) {
    retries = +retries|0
    retries = retries || 10

    do {
      if (retries-- < 1) break

      var name = path.join(tmpdir, [
          prefix
        , '-'
        , process.pid
        , (Math.random() * 0x1000000000).toString(36)
      ].join(''))
    } while (fs.existsSync(name))

    return name
  }
}
