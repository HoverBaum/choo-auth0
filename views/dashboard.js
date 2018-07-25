const html = require('choo/html')
const Identicon = require('identicon.js')

const TITLE = 'dashboard'

module.exports = view

function view (state, emit) {
  if (!state.auth.loggedIn) return html`<div></div>`

  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  // create a base64 encoded PNG for the logged in user.
  const userId = state.auth && state.auth.userId
  const avatarData = new Identicon(userId, 420).toString()

  return html`
    <body class="lh-copy sans-serif">
      <main class="pa3 cf center">
        <h1>Welcome to your dashboard 🎉</h1>

        <p>Here is an avatar generated just for you:</p>

        <img src="data:image/png;base64,${avatarData}">

        <p>And here is all the data from the auth part of our store. The token is used to generate the avatar above.<br />
        More specifically we are using your ID communicated as the subject within the idToken.<br />
        For you that is: "${userId}".</p>

        <code class="mw8">
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(state.auth, null, 2)}</pre>
        </code>

        <p>Let's try to log out and in again.</p>

        <button
          class="f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box bg-white pointer"
          onclick=${() => emit('auth:logout')}
        >
          Logout
        </button>

        <p>Or <a href="/">go to the landing page</a> to see how the site interacts with logged in users.</p>

      </main>
    </body>
  `
}
