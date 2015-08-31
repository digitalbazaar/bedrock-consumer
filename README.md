# bedrock-consumer

A [bedrock][] module that provides an interface for managing information
for consumers of an application. This includes retrieving and caching
credentials for consumers.

## Quick Examples

TODO:

## Setup

```
bower install bedrock-consumer
```

Installation of the module followed by a restart of your [bedrock][]
application is sufficient to make the module available.

## API

### handleCredential

Process an Identity containing credentials by verifying the basic credential information and then emitting an event containing the verified credential information and all the data necessary to respond to the request. Credential consumer event listeners will determine how to consume the given credentials and then complete the response to the request via the res/next parameters.

[bedrock]: https://github.com/digitalbazaar/bedrock
