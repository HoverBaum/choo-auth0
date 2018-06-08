module.exports = authStore

const auth0 = require('auth0-js')

// Initiallice auth0 communication.
const webAuth = new auth0.WebAuth({
  domain: process.env.DOMAIN,
  clientID: process.env.CLIENT_ID,
  responseType: 'token',
  audience: 'https://localhost:8080',
  scope: 'choo:auth0',
  redirectUri: 'https://localhost:8080/dashboard'
})

function authStore (state, emitter) {
  state.auth = {
    loggedIn: false,
    token: null,
    tokenExpirationDate: null
  }

  emitter.on('auth:startAuthentication', () => webAuth.authorize())

  // If we are serverside at this point return ebcause now we will look at authentication on the client.
  if (typeof window === 'undefined') return

  // Check local storage if we are logged in.
  // This was potentially just set.
  const storedTokenExpirationDate = window.localStorage.tokenExpirationDate
  const storedToken = window.localStorage.token
  if (storedTokenExpirationDate && storedToken) {
    // Save authentication information to the state.
    state.auth.tokenExpirationDate = JSON.parse(storedTokenExpirationDate)
    state.auth.token = JSON.parse(storedToken)
    state.auth.loggedIn = true
  }

  // On page load check if there is a hash that we should handle.
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      // Save authentication information to localStorage.
      const tokenExpiration = authResult.expiresIn * 1000 + new Date().getTime()
      window.localStorage.tokenExpirationDate = JSON.stringify(tokenExpiration)
      window.localStorage.token = JSON.stringify(authResult.accessToken)
      console.log(authResult)

      state.auth.token = authResult.accessToken
      state.auth.tokenExpirationDate = tokenExpiration
      state.auth.loggedIn = true

      // Remove the hash after using is.
      emitter.emit(state.events.REPLACESTATE, window.location.pathname)
    } else if (err) {
      console.error(err)
    }

    // Re-direct not logged in users to login page.
    // In our case login is under '/'.
    // Thanks JS event loop for making this the last place we reach
    if (!state.auth.loggedIn) {
      emitter.emit(state.events.REPLACESTATE, '/')
    }
  })
}
