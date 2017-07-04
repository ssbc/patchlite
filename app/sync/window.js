const nest = require('depnest')

exports.gives = nest('app.sync.window')
exports.create = function (api) {
  return nest('app.sync.window', (window) => window)
}
