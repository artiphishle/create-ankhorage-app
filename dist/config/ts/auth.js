import { CognitoPasswordConstraint, CognitoUserPoolSigninMethod, CognitoUserProperty, } from './types';
const auth = {
    version: 2,
    resourceName: 'ankhcognito',
    serviceConfiguration: {
        serviceName: 'Cognito',
        userPoolConfiguration: {
            signinMethod: CognitoUserPoolSigninMethod.EMAIL,
            requiredSignupAttributes: [
                CognitoUserProperty.EMAIL,
                CognitoUserProperty.NICKNAME,
            ],
            passwordPolicy: {
                minimumLength: 8,
                additionalConstraints: [
                    CognitoPasswordConstraint.REQUIRE_LOWERCASE,
                    CognitoPasswordConstraint.REQUIRE_UPPERCASE,
                    CognitoPasswordConstraint.REQUIRE_DIGIT,
                    CognitoPasswordConstraint.REQUIRE_SYMBOL,
                ],
            },
        },
        includeIdentityPool: true,
    },
};
export { auth };
//# sourceMappingURL=auth.js.map