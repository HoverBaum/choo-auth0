/**
 * Landing page of our application that users can start their login from.
 */

var html = require('choo/html')

var TITLE = 'secured-choo - main'

module.exports = view

function view (state, emit) {
  // Re-direct to dashbaord if user is already logged in.
  if (state.auth.loggedIn) emit(state.events.PUSHSTATE, '/dashboard')

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="lh-copy sans-serif">
      <main class="pa3 cf center">
        <h1>Please login to see the application</h1>

        <button
          class="f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box bg-white pointer"
          onclick=${() => emit('auth:startAuthentication')}
        >
          Login
        </button>
      </main>
    </body>
  `
}
