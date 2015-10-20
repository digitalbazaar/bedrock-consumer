/*
 * Bedrock Consumer Module Configuration
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

config.consumer = {};
// defaults to use for non-persistent identities
config.consumer.defaults = {};
config.consumer.defaults.identity = {};

/* Example identity defaults
config.consumer.defaults.identity = {
  preferences: {...},
  sysResourceRole: [{
    sysRole: 'identity.someRole',
    // this will set the resource to the `id` of the identity
    generateResource: 'id'
  }],
  sysStatus: 'active'
};
*/
