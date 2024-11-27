// src/config/ts/auth.ts
var auth = {
  version: 2,
  resourceName: "ankhcognito",
  serviceConfiguration: {
    serviceName: "Cognito",
    userPoolConfiguration: {
      signinMethod: "EMAIL" /* EMAIL */,
      requiredSignupAttributes: [
        "EMAIL" /* EMAIL */,
        "NICKNAME" /* NICKNAME */
      ],
      passwordPolicy: {
        minimumLength: 8,
        additionalConstraints: [
          "REQUIRE_LOWERCASE" /* REQUIRE_LOWERCASE */,
          "REQUIRE_UPPERCASE" /* REQUIRE_UPPERCASE */,
          "REQUIRE_DIGIT" /* REQUIRE_DIGIT */,
          "REQUIRE_SYMBOL" /* REQUIRE_SYMBOL */
        ]
      }
    },
    includeIdentityPool: true
  }
};
export {
  auth
};
