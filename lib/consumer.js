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

// FIXME: remove me
var SESSION_EXPIRATION = 2 * 60 * 60 * 1000;  // 2 hours

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

// TODO: support storing credentials and getting composed identity views based
// on the credentials available for a particular user, so... when asking for
// an identity by ID, you'd get back the identity with the properties
// and values asserted by any credentials stored for it

/**
 * Attempt to establish an authorized session for the user that sent the
 * request.
 *
 * @param req the request.
 * @param res the response.
 * @param next the next route handler.
 * @param callback(err, user) called once the operation completes with
 *          the `user` that was logged in.
 */
api.login = function(req, res, next) {
  // TODO: cookie contents TBD
  var sessionData = {
    did: req.user.identity.id
  };
  res.cookie(
    _encodeSessionKey(req.user.identity.id), JSON.stringify(sessionData),
    {expires: new Date(Date.now() + SESSION_EXPIRATION), secure: true});
  next();
  // TODO: saving the following code for future use
  /*
  brPassport.authenticate('did', function(err, user, info) {
    if(!user) {
      // user not authenticated
      err = new BedrockError(
        'The given decentralized identity could not be authenticated.',
        'InvalidLogin', {'public': true, httpStatusCode: 400});
    }
    if(err) {
      return callback(err);
    }
    req.logIn(user, function(err) {
      callback(err, user);
    });
  })(req, res, next);
  */
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
          if(err.type === 'NotFound') {
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
      info.user.identity = _.assign({}, config.identity.defaults, identity);

      // handle `generateResource` feature
      var roles = bedrock.jsonld.getValues(identity, 'sysResourceRole');
      roles.forEach(function(role) {
        if(role.generateResource === 'id') {
          role.resource = [identity.id];
        }
      });
    }]
  }, function(err) {
    callback(err);
  });
});

// FIXME: remove me
function _encodeSessionKey(key) {
  // NOTE: stripping colon because angular-cookie encodes it
  return [key.replace(/[:]/g,''), 'session'].join('.');
}
