"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const types_1 = require("./types");
const auth = {
    version: 2,
    resourceName: "ankhcognito",
    serviceConfiguration: {
        serviceName: "Cognito",
        userPoolConfiguration: {
            signinMethod: types_1.CognitoUserPoolSigninMethod.EMAIL,
            requiredSignupAttributes: [
                types_1.CognitoUserProperty.EMAIL,
                types_1.CognitoUserProperty.NICKNAME
            ],
            passwordPolicy: {
                minimumLength: 8,
                additionalConstraints: [
                    types_1.CognitoPasswordConstraint.REQUIRE_LOWERCASE,
                    types_1.CognitoPasswordConstraint.REQUIRE_UPPERCASE,
                    types_1.CognitoPasswordConstraint.REQUIRE_DIGIT,
                    types_1.CognitoPasswordConstraint.REQUIRE_SYMBOL,
                ]
            },
        },
        includeIdentityPool: true,
    },
};
exports.auth = auth;
