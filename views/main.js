/**
 * Landing page of our application that users can start their login from.
 */

const html = require('choo/html')

const TITLE = 'secured-choo - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="lh-copy sans-serif">
      <main class="pa3 cf center">
        
        ${!state.auth.loggedIn ? html`
          <div>
            <h1>Please login to see the application</h1>

            <button
              class="f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box bg-white pointer"
              onclick=${() => emit('auth:startAuthentication')}
            >
              Login
            </button>
          </div>
        ` : html`
          <div>
            <h1>You are logged in</h1>  

            <a href="/dashboard">To your dashboard</a>
          </div>
        `}
        
      </main>
    </body>
  `
}
