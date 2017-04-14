const nest = require('depnest')
const h = require('mutant/h')

exports.gives = nest('app.html.menuItem')
exports.create = function (api) {
  return nest('app.html.menuItem', menuItem)

  function menuItem (handleClick) {
    return h('a', {
      events: {
        click: () => handleClick('/config')
      }
    }, '/config')
  }
}
