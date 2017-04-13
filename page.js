const nest = require('depnest')
const h = require('mutant/h')

exports.gives = nest('app.html.page')
exports.needs = nest('keys.sync.load', 'first')
exports.create = function (api) {
  return nest('app.html.page', keyPage)

  function keyPage (path) {
    if (path !== '/lite') return

    const importKey = h('textarea', {
      placeholder: 'import an existing public/private key',
      name: 'textarea'
    })

    const importRemote = h('textarea', { 
      placeholder: 'import an existing remote',
      name: 'textarea'
    })

    return h('LitePage', [
      h('section.secret', [
        h('p', [
          `Your secret key is:`,
          h('pre', h('code', localStorage['browser/.ssb/secret']))
        ]),
        h('form', [
          importKey,
          h('button', {
            events: {
              click: function (ev) {
                ev.preventDefault()

                localStorage['browser/.ssb/secret'] = importKey.value.replace(/\s+/g, ' ')
                alert('Your public/private key has been updated')
              }
            }
          }, 'Import')
        ])
      ]),
      h('section.remote', [
        h('p', [
          `Your WebSocket remote is:`,
          h('pre', h('code', localStorage.remote)),
          h('button', {
            events: {
              click: function (ev) {
                ev.preventDefault()

                localStorage.remote = importRemote.value
                alert('Your WebSocket remote has been updated')
              }
            }
          }, 'Import')
        ])
      ])
    ])
  }
}
