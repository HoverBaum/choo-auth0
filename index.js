const css = require('sheetify')
const choo = require('choo')

css('tachyons')

const app = choo()
app.use(require('choo-devtools')())

app.use(require('./stores/auth'))

app.route('/', require('./views/main'))
app.route('/dashboard', require('./views/dashboard'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
