/*
 * Bedrock Consumer module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var brPermission = require('bedrock-permission');
var database = require('bedrock-mongodb');
var BedrockError = bedrock.util.BedrockError;

// load config defaults
require('./config');

// module permissions
var PERMISSIONS = bedrock.config.permission.permissions;

// module API
var api = {};
module.exports = api;

// TODO: support storing/retrieving identity information (mongodb),
// essentially just IDs and sysResourceRoles

// TODO: support storing credentials and getting identity views based on
// the credentials available for a particular user, so... when asking for
// an identity by ID, you'd get back the identity with the properties
// and values asserted by any credentials stored for it
