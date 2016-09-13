# bedrock-consumer

A [bedrock][] library that provides an interface for managing information
for consumers of an application. It is not a comprehensive credential
consumer application, rather it provides simpler helper methods for
authenticating and establishing user sessions and a method to verify and
convert a posted identity profile to an event-based API for doing something
with its credentials.

This module:

* Provides [express][] middleware for decentralized identity authentication,
  creating and destroying sessions with an application, and converting
  a posted identity profile that contains credentials into an event-based
  API for processing those credentials
* Attaches some user information to session state to assist frontend
  applications
* Works in conjunction with [bedrock-passport][] to setup default user
  settings and permissions for non-persistent users that log into an
  application



## Requirements

- npm v3+

## Middleware

This module provides some express middleware:

* **login** - This middleware will attempt to establish an authenticated
  session for the user that sent the request. Upon success, a status code
  of 200 and the identity that was authenticated are sent to the client. If
  the user can't be authenticated, a status code of 400 is returned. See
  [bedrock-passport][] or [bedrock-identity][] for more information.
* **logout** - This middleware will destroy any currently authenticated
  session and return a status code of 204.
* **authenticate** - This middleware will attempt to authenticate the given
  decentralized identity by verifying its digital signature and any signatures
  found on its associated credentials. A status code of 200 and a response
  body including the authenticated identity and verified credentials is
  returned to the client on success. If the user cannot be authenticated, a
  status code of 400 is returned.
* **handleCredential** - This middleware will attempt to verify the posted
  identity profile containg credentials, and on success, will pass them to
  [bedrock][]'s event API using the custom
  `bedrock-consumer.credentials.process` event. Any event handlers will be
  passed event data with the [express] `request`, `response`, and `next`
  middleware handler, as well as the `identity` and `verifyResults`. Once
  all event handlers have executed (or once one of them cancels and takes over
  the process), a status code of 204 will be returned to the client.

## Setup

```
bower install bedrock-consumer
```

Installation of the module followed by a restart of your [bedrock][]
application is sufficient to make the module available.

<!-- ## How It Works

TODO: -->


[bedrock]: https://github.com/digitalbazaar/bedrock
[bedrock-identity]: https://github.com/digitalbazaar/bedrock-identity
[bedrock-passport]: https://github.com/digitalbazaar/bedrock-passport
[express]: https://github.com/expressjs/express
