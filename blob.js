const nest = require('depnest')
const URL = require('url')

exports.gives = nest('blob.sync.url')
exports.needs = nest('config.sync.load', 'first')
exports.create = (api) => {
  var baseUrl
  return nest('blob.sync.url', (id) => {
    if (!baseUrl) {
      const config = api.config.sync.load()
      baseUrl = remoteToUrlBase(config.remote)
    }
    return baseUrl + id
  })
}

function remoteToUrlBase (remote) {
  var r = URL.parse(remote.split('~')[0])
  // this will work for ws and wss.
  r.protocol = r.protocol.replace('ws', 'http')
  r.pathname = '/blobs/get/'
  return URL.format(r)
}
