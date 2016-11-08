/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var mock = {};

module.exports = mock;

mock.authenticateInfo = {
  "strategy": "did",
  "options": {},
  "user": {
    "identity": {
      "@context": "https://w3id.org/identity/v1",
      "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
      "type": "Identity",
      "credential": [
        {
          "@graph": {
            "@context": "https://w3id.org/identity/v1",
            "id": "urn:ephemeral:a87533f4-af4a-45e4-8f38-55fb3ae29fd7",
            "type": [
              "Credential",
              "CryptographicKeyCredential"
            ],
            "claim": {
              "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
              "publicKey": {
                "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
                "owner": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
                "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA09oB2kusKFuPsD6n6jHq\r\nLod/ILY4nh81krHhLgHQ+dpLBLlk8Zoi8XAkcuh57aJmFBsmtFt/J49GziCphkKD\r\nh9iN6QFAMIYtr/I6i3yug0ixyXcx+EwhADmVcCMV8U2MYDXkoBwqNir8re4i5qVc\r\nyELiUtcZH+jhtTzmqDKkDhaRTJJL+xw3WrsJxZqbvHCSXpuTu/8VR2X1oy/2gvpW\r\nt/T1KMq3UyNYS7OAIscYJxfgqr1mItUBFGvU/BMUFwZ73IharaWb86da1H79tYJc\r\nNw7Fu4hSD0LeSxzraHBfGl+XIZEa8t50cw7muhrC1dnPeCD9hUsUoLBx+y34ykEB\r\nlwIDAQAB\r\n-----END PUBLIC KEY-----\r\n"
              }
            },
            "signature": {
              "type": "LinkedDataSignature2015",
              "created": "2016-11-08T17:32:23Z",
              "creator": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
              "signatureValue": "W9M/s31qbncRX8FRc9i8jUAM85+81d3INSriXsBjKPBzhGNzFRArz+RqzFUnt03ymMJHRCNsStvxuM2UK65uYsEPuYjVS0w8xAlq3KyziEO3L4a6KLF3aRAlx0oabsjq990ypykNOJb1/dsiT0vpssCBPatYdUR8t3zvnvKQInkMcChB9cWLYnCpdMOcSC1EjWdFA17fKHRZST+roVelQaPT5LROdfF4oMWsaq0ogLGtxXbhr8L9311P24YjHwIT2ndO1dlyiTFLyPA/cbd1ND/dyxY+wgo6PDiUOneoB6oa9+hiy5Ls+4/5vKxCHe18XsCXh0cR66tN3Os6b3it+Q=="
            }
          }
        }
      ],
      "signature": {
        "type": "LinkedDataSignature2015",
        "created": "2016-11-08T17:32:23Z",
        "creator": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
        "domain": "issuer.truecred.dev:23443",
        "signatureValue": "gv/vSQ6GD6alEI0o8NSYkBIVPurQN0YVU6Sq9PmCQ8Gh4znehXB6xRlS7Gpo65X8062ccxu5+wEoCkTK0UVEhmp9EzO3Y9rYPRVLpDA4T8SwkRtnkGGFCAuFpob/6BkRZFy0d1a5/zN/mlRmekZBJ3r3RAgrJ53CyScI4M7NmTA6xZ1JUYkigFxZ4dA7X7xxR6ZcBDrknnrQDzTHvB5tLoFdIUG6mDgMjKmZ0kIQkaMutYoijUOcXkDDgBigJDXzX8lNHd3ELtN3li7P4FSfqlBZSXOcPEwbcSwvCfPDjUhD4gP4bJUU8NoGLvCWsfegGmLf/ZZhCIsYq/XyV1KO3Q=="
      }
    },
    "credentials": {
      "urn:ephemeral:a87533f4-af4a-45e4-8f38-55fb3ae29fd7": {
        "publicKey": {
          "@context": "https://w3id.org/identity/v1",
          "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
          "type": "CryptographicKey",
          "owner": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA09oB2kusKFuPsD6n6jHq\r\nLod/ILY4nh81krHhLgHQ+dpLBLlk8Zoi8XAkcuh57aJmFBsmtFt/J49GziCphkKD\r\nh9iN6QFAMIYtr/I6i3yug0ixyXcx+EwhADmVcCMV8U2MYDXkoBwqNir8re4i5qVc\r\nyELiUtcZH+jhtTzmqDKkDhaRTJJL+xw3WrsJxZqbvHCSXpuTu/8VR2X1oy/2gvpW\r\nt/T1KMq3UyNYS7OAIscYJxfgqr1mItUBFGvU/BMUFwZ73IharaWb86da1H79tYJc\r\nNw7Fu4hSD0LeSxzraHBfGl+XIZEa8t50cw7muhrC1dnPeCD9hUsUoLBx+y34ykEB\r\nlwIDAQAB\r\n-----END PUBLIC KEY-----\r\n"
        },
        "publicKeyOwner": {
          "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
          "https://w3id.org/identity#idp": {
            "id": "did:4ddbace2-4a52-4a63-80b1-3885d556aced"
          },
          "https://w3id.org/permissions#accessControl": {
            "id": "_:b0",
            "https://w3id.org/permissions#writePermission": [
              {
                "id": "did:4ddbace2-4a52-4a63-80b1-3885d556aced",
                "type": "https://w3id.org/identity#Identity"
              },
              {
                "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1"
              }
            ]
          },
          "publicKey": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
          "signature": {
            "id": "_:b1",
            "type": "LinkedDataSignature2015",
            "created": "2016-11-08T15:57:16Z",
            "creator": {
              "id": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc/keys/1",
              "type": "CryptographicKey",
              "owner": "did:d7de2ea2-c1df-4a24-a10e-62b2de3378fc",
              "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA09oB2kusKFuPsD6n6jHq\r\nLod/ILY4nh81krHhLgHQ+dpLBLlk8Zoi8XAkcuh57aJmFBsmtFt/J49GziCphkKD\r\nh9iN6QFAMIYtr/I6i3yug0ixyXcx+EwhADmVcCMV8U2MYDXkoBwqNir8re4i5qVc\r\nyELiUtcZH+jhtTzmqDKkDhaRTJJL+xw3WrsJxZqbvHCSXpuTu/8VR2X1oy/2gvpW\r\nt/T1KMq3UyNYS7OAIscYJxfgqr1mItUBFGvU/BMUFwZ73IharaWb86da1H79tYJc\r\nNw7Fu4hSD0LeSxzraHBfGl+XIZEa8t50cw7muhrC1dnPeCD9hUsUoLBx+y34ykEB\r\nlwIDAQAB\r\n-----END PUBLIC KEY-----\r\n"
            },
            "signatureValue": "gzLSigWE6z41RBB5Zqy3KFBcCH2PDrROIHRcNPxG20o5YE9ZUNFfOq9kS1NVQkzJxupg0wn+KUUBka9vRNHC9xuNzUUvzT7E3mRF1iLdGRhHs5YBLp6KJN85o3VlA/TECciKOJMllq/dbhuxpmAnzy5FA6ouaXh80Lb6UWhhurMqbqCqzOfGFp714KZUXwTjqBCfjWnqqK3WUtX/DUz2agH0/snQts0EuSIOkTtj2lRXryiv0vG6yfozG17JDf+gTHz9biLjlzR5szfkggwJ28hrSlVhU4qGxqnfGx5UsjYJ6Aeg0l8q/HBbOwW5lZhOJy8L1GL7AEqlApDN8yQ9CA=="
          }
        },
        "verified": true
      }
    }
  }
};
