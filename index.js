const bulk = require('bulk-require')

module.exports = {
  patchlite: bulk(__dirname, [
    './!(node_modules)/**/*.js'
  ])
}
