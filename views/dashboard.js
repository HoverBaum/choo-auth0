var html = require('choo/html')

var TITLE = 'dashboard'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="lh-copy sans-serif">
      <main class="pa3 cf center">
        <h1>Welcome to your dashboard</h1>

        <code class="mw8">
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(state.auth, null, 2)}</pre>
        </code>
      </main>
    </body>
  `
}
