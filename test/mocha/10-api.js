/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
/* globals should */
var bedrock = require('bedrock');
var mockData = require('./mock.data');

describe('bedrock-consumer', () => {
  it('authenticate handler adds identity defaults', done => {
    var authInfo = bedrock.util.clone(mockData.authenticateInfo);
    bedrock.config.consumer.defaults.identity.sysResourceRole = [{
      sysRole: 'd95bcf89-eca7-41d3-a8bb-af5b8bd78e7d',
      generateResource: 'id'
    }];
    bedrock.events.emit('bedrock-passport.authenticate', authInfo, () => {
      var i = authInfo.user.identity;
      should.exist(i.sysResourceRole);
      i.sysResourceRole.should.be.an('array');
      i.sysResourceRole.should.have.length(1);
      var role = i.sysResourceRole[0];
      should.not.exist(role.generateResource);
      role.should.be.an('object');
      should.exist(role.sysRole);
      role.sysRole.should.equal('d95bcf89-eca7-41d3-a8bb-af5b8bd78e7d');
      should.exist(role.resource);
      role.resource.should.be.an('array');
      role.resource.should.have.length(1);
      role.resource[0].should.equal(authInfo.user.identity.id);
      done();
    });
  });
});
