# Auth0 secured choo

Securing a [choo](https://www.irccloud.com/irc/freenode/channel/choo) app with [Auth0](https://auth0.com/).

Check out the [working demo](https://auth0-secured-choo.netlify.com/).

This repository is an example implementation for a blogpost on the topic of [**Coming soon**].

## Running the project

To run the project, first run `npm i`. After that, you need to set two environment variables: DOMAIN and CLIENT_ID before you can run `npm start`. You can acquire these by signing up for an account with Auth0. once you have done so navigate to [your applications](https://manage.auth0.com/#/applications) and either use the default one or create a new one. Either way you should set `https://localhost:8080/dashboard` as an "*Allowed Callback URL*" and set "*Application Type*" to "Single Page Application".

Now locally run the application with:

```
DOMAIN=[your domain] CLIENT_ID=[your client id] npm start
```