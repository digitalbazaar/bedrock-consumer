/*
 * Bedrock Consumer module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var async = require('async');
var bedrock = require('bedrock');
var credentials = require('credentials-io');

// load config defaults
require('./config');

// module permissions
var PERMISSIONS = bedrock.config.permission.permissions;

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

// TODO: support storing/retrieving identity information (mongodb),
// essentially just IDs and sysResourceRoles

// TODO: support storing credentials and getting identity views based on
// the credentials available for a particular user, so... when asking for
// an identity by ID, you'd get back the identity with the properties
// and values asserted by any credentials stored for it
