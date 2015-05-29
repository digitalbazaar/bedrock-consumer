/*
 * Bedrock Consumer module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var BedrockError = bedrock.util.BedrockError;

// load config defaults
require('./config');

// module API
var api = {};
module.exports = api;
