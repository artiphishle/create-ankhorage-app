/**
 * Password constraints that can be applied to Cognito user pools.
 */
export var CognitoPasswordConstraint;
(function (CognitoPasswordConstraint) {
    CognitoPasswordConstraint["REQUIRE_LOWERCASE"] = "REQUIRE_LOWERCASE";
    CognitoPasswordConstraint["REQUIRE_UPPERCASE"] = "REQUIRE_UPPERCASE";
    CognitoPasswordConstraint["REQUIRE_DIGIT"] = "REQUIRE_DIGIT";
    CognitoPasswordConstraint["REQUIRE_SYMBOL"] = "REQUIRE_SYMBOL";
})(CognitoPasswordConstraint || (CognitoPasswordConstraint = {}));
export var CognitoUserPoolSigninMethod;
(function (CognitoUserPoolSigninMethod) {
    CognitoUserPoolSigninMethod["USERNAME"] = "USERNAME";
    CognitoUserPoolSigninMethod["EMAIL"] = "EMAIL";
    CognitoUserPoolSigninMethod["PHONE_NUMBER"] = "PHONE_NUMBER";
    CognitoUserPoolSigninMethod["EMAIL_AND_PHONE_NUMBER"] = "EMAIL_AND_PHONE_NUMBER";
})(CognitoUserPoolSigninMethod || (CognitoUserPoolSigninMethod = {}));
export var CognitoUserAliasAttributes;
(function (CognitoUserAliasAttributes) {
    CognitoUserAliasAttributes["PREFERRED_USERNAME"] = "PREFERRED_USERNAME";
    CognitoUserAliasAttributes["EMAIL"] = "EMAIL";
    CognitoUserAliasAttributes["PHONE_NUMBER"] = "PHONE_NUMBER";
})(CognitoUserAliasAttributes || (CognitoUserAliasAttributes = {}));
export var CognitoUserProperty;
(function (CognitoUserProperty) {
    CognitoUserProperty["ADDRESS"] = "ADDRESS";
    CognitoUserProperty["BIRTHDATE"] = "BIRTHDATE";
    CognitoUserProperty["EMAIL"] = "EMAIL";
    CognitoUserProperty["FAMILY_NAME"] = "FAMILY_NAME";
    CognitoUserProperty["MIDDLE_NAME"] = "MIDDLE_NAME";
    CognitoUserProperty["GENDER"] = "GENDER";
    CognitoUserProperty["LOCALE"] = "LOCALE";
    CognitoUserProperty["GIVEN_NAME"] = "GIVEN_NAME";
    CognitoUserProperty["NAME"] = "NAME";
    CognitoUserProperty["NICKNAME"] = "NICKNAME";
    CognitoUserProperty["PHONE_NUMBER"] = "PHONE_NUMBER";
    CognitoUserProperty["PREFERRED_USERNAME"] = "PREFERRED_USERNAME";
    CognitoUserProperty["PICTURE"] = "PICTURE";
    CognitoUserProperty["PROFILE"] = "PROFILE";
    CognitoUserProperty["UPDATED_AT"] = "UPDATED_AT";
    CognitoUserProperty["WEBSITE"] = "WEBSITE";
    CognitoUserProperty["ZONE_INFO"] = "ZONE_INFO";
})(CognitoUserProperty || (CognitoUserProperty = {}));
/**
 * Additional Cognito user properties that can only be read, not written.
 */
export var CognitoUserPropertyVerified;
(function (CognitoUserPropertyVerified) {
    CognitoUserPropertyVerified["EMAIL_VERIFIED"] = "EMAIL_VERIFIED";
    CognitoUserPropertyVerified["PHONE_NUMBER_VERIFIED"] = "PHONE_NUMBER_VERIFIED";
})(CognitoUserPropertyVerified || (CognitoUserPropertyVerified = {}));
