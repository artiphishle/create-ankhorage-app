import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({

  loginWith: {
    email: true
  },
  userAttributes: {
    'custom:firstName': {
      dataType: "String",
      mutable: true,
      minLen: 2,
      maxLen: 25
    },
    'custom:lastName': {
      dataType: "String",
      mutable: true,
      minLen: 2,
      maxLen: 25
    },
  }
});