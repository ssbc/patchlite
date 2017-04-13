const nest = require('depnest')
const ref = require('ssb-ref')
const h = require('mutant/h')

exports.gives = nest('app.html.page')
exports.needs = nest({
  'config.sync.load': 'first',
  'invite.async.accept': 'first'
})
exports.create = function (api) {
  const loadConfig = api.config.sync.load
  const acceptInvite = api.invite.async.accept

  return nest('app.html.page', invitePage)

  function invitePage (path) {
    if (window.location.hash === '' || window.location.hash === '#') return
    const invite = location.hash.substring(1)
    const inviteData = ref.parseInvite(invite)
    if (!inviteData) return

    const progress = acceptInvite(invite, err => {
      if (err) throw err
      console.log('invited', err)
      window.location.hash = ''
      window.location.reload()
    })

    // change config so we can connect to sbot
    // TODO this should only happen after invite is successful
    var config = loadConfig()
    localStorage.remote = inviteData.remote
    config.remote = inviteData.remote

    return h('Invitee', [
      h('h1', 'Secure Scuttlebutt'),
      progress
    ])
  }
}
