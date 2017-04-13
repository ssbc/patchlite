const nest = require('depnest')
const URL = require('url')

exports.gives = nest('blob.sync.url')
exports.needs = nest('config.sync.load', 'first')
exports.create = (api) => {
  var blobUrl
  return nest('blob.sync.url', () => {
    if (!blobUrl) {
      const config = api.config.sync.load()
      blobUrl = remoteToBlobUrl(config.remote)
    }
    return blobUrl
  })
}

function remoteToBlobUrl (remote) {
  var r = URL.parse(remote.split('~')[0])
  // this will work for ws and wss.
  r.protocol = r.protocol.replace('ws', 'http')
  r.pathname = '/blobs/get'
  return URL.format(r)
}
