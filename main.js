const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')

const patchlite = require('./')
const patchbay = require('patchbay')
const patchcore = require('patchcore')

// polyfills
require('setimmediate')
require('array-includes').shim()

// from more specialized to more general
const sockets = combine(
  patchlite,
  patchbay,
  patchcore
)

const api = entry(sockets, nest('app.html.app', 'first'))

const app = api.app.html.app()
document.body.appendChild(app)
