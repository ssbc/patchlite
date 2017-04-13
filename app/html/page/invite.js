const nest = require('depnest')
const ref = require('ssb-ref')
const h = require('mutant/h')

exports.gives = nest('app.html.page')
exports.needs = nest('invite.async.accept', 'first')
exports.create = function (api) {
  const acceptInvite = api.invite.async.accept

  return nest('app.html.page', invitePage)

  function invitePage (path) {
    if (window.location.hash === '' || window.location.hash === '#') return
    const invite = location.hash.substring(1)
    const inviteData = ref.parseInvite(invite)
    if (!inviteData) return

    const progress = acceptInvite(invite, err => {
      if (err) throw err
      localStorage.remote = data.remote
      window.location.hash = ''
      window.location.reload()
    })

    return h('Invitee', [
      h('h1', 'Secure Scuttlebutt'),
      progress
    ])
  }
}
