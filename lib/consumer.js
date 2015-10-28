/*
 * Bedrock Consumer module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var _ = require('lodash');
var async = require('async');
var bedrock = require('bedrock');
var brIdentity = require('bedrock-identity');
var brPassport = require('bedrock-passport');
var credentials = require('credentials-io');
var BedrockError = bedrock.util.BedrockError;

// load config defaults
require('./config');

// module API
var api = {};
module.exports = api;

/**
 * Process an Identity containing credentials by verifying the basic
 * credential information and then emitting an event containing the
 * the verified credential information and all the data necessary to
 * respond to the request. Credential consumer event listeners will
 * determine how to consume the given credentials and then complete the
 * response to the request via the res/next parameters.
 *
 * Emits the following event when receiving a credential:
 *
 * Event: bedrock-consumer.credentials.process
 * Data:
 *   request the HTTP request.
 *   response the HTTP response.
 *   next the next callback in the express chain.
 *   identity the verified identity.
 *   verifyResults the results of the verification process.
 *
 * @param req the HTTP request.
 * @param res the HTTP response.
 * @param next the next callback in the express chain.
 */
api.handleCredential = function(req, res, next) {
  async.auto({
    verify: function(callback) {
      // TODO: enable timestamp checking on sandbox
      var checkTimestamp = !(bedrock.config.environment === 'development' ||
        bedrock.config.environment === 'testing' ||
        bedrock.config.environment === 'sandbox');
      credentials.verify(req.body, {
        checkTimestamp: checkTimestamp
      }, callback);
    },
    emit: ['verify', function(callback, results) {
      bedrock.events.emit(
        'bedrock-consumer.credentials.process', {
          request: req,
          response: res,
          next: next,
          identity: req.body,
          verifyResults: results.verify
        }, callback);
    }]
  }, function(err, results) {
    if(results.emit === false) {
      // the event, along with the HTTP response, was handled by another module
      return;
    }
    if(err) {
      // there was an error while emitting the event
      return next(err);
    }

    // the event was not handled by another module, handle the HTTP response
    res.send(204);
  });
};

/**
 * Attempt to establish an authorized session for the user that sent the
 * request. Upon success, a status code of 200 and the identity that was
 * authenticated are sent to the client.
 *
 * @param req the request.
 * @param res the response.
 * @param next the next route handler.
 */
api.login = function(req, res, next) {
  brPassport.authenticate('did', function(err, user) {
    if(!user) {
      // user not authenticated
      err = new BedrockError(
        'The given decentralized identity could not be authenticated.',
        'NotAuthenticated', {'public': true, httpStatusCode: 400});
    }
    if(err) {
      return next(err);
    }
    req.login(user, function(err) {
      if(err) {
        return next(err);
      }
      res.status(200).send(user.identity);
    });
  })(req, res, next);
};

api.logout = function(req, res, next) {
  req.logout();
  res.sendStatus(204);
};

/**
 * Attempt to authenticate the given identity. Upon success, a status code of
 * 200 and the identity that was authenticated and any related authentication
 * information are sent to the client.
 *
 * @param req the request.
 * @param res the response.
 * @param next the next route handler.
 */
api.authenticate = function(req, res, next) {
  brPassport.authenticate('did', function(err, user) {
    if(!user) {
      // user not authenticated
      err = new BedrockError(
        'The given decentralized identity could not be authenticated.',
        'NotAuthenticated', {'public': true, httpStatusCode: 400});
    }
    if(err) {
      return next(err);
    }
    res.status(200).send(
      {identity: user.identity, credentials: user.credentials});
  })(req, res, next);
};

// add identity defaults to non-persistent identities
bedrock.events.on('bedrock-passport.authenticate', function(info, callback) {
  var config = bedrock.config.consumer;
  var identity = info.user.identity;
  async.auto({
    isPersistent: function(callback) {
      // TODO: optimize to existence check or check to see if strategy already
      // did the check
      brIdentity.get(null, identity.id, function(err) {
        if(err) {
          if(err.name === 'NotFound') {
            return callback(null, false);
          }
          return callback(err);
        }
        callback(null, true);
      });
    },
    addDefaults: ['isPersistent', function(callback, results) {
      // do not add defaults for a persistent user, any defaults would
      // be handled by `bedrock-identity` instead
      if(results.isPersistent) {
        return callback();
      }
      // apply defaults to identity
      info.user.identity = _.assign({}, config.defaults.identity, identity);

      // handle `generateResource` feature
      var roles = bedrock.jsonld.getValues(identity, 'sysResourceRole');
      roles.forEach(function(role) {
        if(role.generateResource === 'id') {
          role.resource = [identity.id];
        }
      });
      callback();
    }]
  }, function(err) {
    callback(err);
  });
});

// optionally install login handler
var brExpress;
try {
  brExpress = require('bedrock-express');
} catch(e) {}

if(brExpress) {
  bedrock.events.on('bedrock-express.configure.routes', function(app) {
    var routes = bedrock.config.consumer.routes;
    app.post(routes.login, api.login);
    app.post(routes.authenticate, api.authenticate);
    app.get(routes.logout, api.logout);
  });
}

// optionally install client-side session access
var brSessionRest;
try {
  brSessionRest = require('bedrock-session-rest');
} catch(e) {}

if(brSessionRest) {
  bedrock.events.on('bedrock-session-rest.session.get', function(req, session) {
    if(req.isAuthenticated() && req.user && req.user.identity &&
      req.user.identity.id) {
      session.identity = session.identity || {};
      session.identity.id = req.user.identity.id;
    }
  });
}
