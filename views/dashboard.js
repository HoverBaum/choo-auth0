const html = require('choo/html')
const Identicon = require('identicon.js')

const TITLE = 'dashboard'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  // create a base64 encoded PNG for the logged in user.
  const avatarData = state.auth && state.auth.token && new Identicon(state.auth.token, 420).toString()

  return html`
    <body class="lh-copy sans-serif">
      <main class="pa3 cf center">
        <h1>Welcome to your dashboard</h1>

        <p>Here is an avatar generated just for you:</p>

        <img src="data:image/png;base64,${avatarData}">

        <p>And here is all the data we are getting from Auth0. The token is used to generate the avatar above.<br />
        That means you get a new one each time you log out.</p>

        <code class="mw8">
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(state.auth, null, 2)}</pre>
        </code>

        <p>Let's try to log out and see the avatar update after logging in again.</p>

        <button
          class="f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box bg-white pointer"
          onclick=${() => emit('auth:logout')}
        >
          Logout
        </button>
      </main>
    </body>
  `
}
