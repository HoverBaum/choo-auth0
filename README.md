# Auth0 secured choo

Securing a [choo](https://www.irccloud.com/irc/freenode/channel/choo) app with [Auth0](https://auth0.com/).

Check out the [working demo](https://auth0-secured-choo.netlify.com/).

This repository is an example implementation for a blogpost on the topic of [**Coming soon**].

## Setup Auth0 Application

Before you can run the project you should go into [your Auth0 Applications](https://manage.auth0.com/#/applications) and create an application or choose one to use for this example. Make sure to note down the *Cleint ID* and *Domain* for your application.

You also need to setup an Allowed Callback URL: `https://localhost:8080/dashboard´. Simply add it on a blank line in your applications settings ""Allowed Callback URLs" section. You might also want to set "Application Type" to "Single Page Application".

Because we want to use tokens in JWT format we also need to define an *API*. Navigate to that point of the left side menu and click "+ CREATE API" to add a new one. Please use `https://jsonplaceholder.typicode.com/` as the "Identifier" for your new API to be compatible with this project. (Or change the audience in sotres/auth.js.) Apart from that you can use the default settings.

## Running the project

To run the project, first run `npm i`. After that, you need to set two environment variables: DOMAIN and CLIENT_ID before you can run `npm start`.

Now locally run the application with:

```
DOMAIN=[your Domain] CLIENT_ID=[your Client ID] npm start
```