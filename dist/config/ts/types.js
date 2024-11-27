// src/config/ts/types.ts
var CognitoPasswordConstraint = /* @__PURE__ */ ((CognitoPasswordConstraint2) => {
  CognitoPasswordConstraint2["REQUIRE_LOWERCASE"] = "REQUIRE_LOWERCASE";
  CognitoPasswordConstraint2["REQUIRE_UPPERCASE"] = "REQUIRE_UPPERCASE";
  CognitoPasswordConstraint2["REQUIRE_DIGIT"] = "REQUIRE_DIGIT";
  CognitoPasswordConstraint2["REQUIRE_SYMBOL"] = "REQUIRE_SYMBOL";
  return CognitoPasswordConstraint2;
})(CognitoPasswordConstraint || {});
var CognitoUserPoolSigninMethod = /* @__PURE__ */ ((CognitoUserPoolSigninMethod2) => {
  CognitoUserPoolSigninMethod2["USERNAME"] = "USERNAME";
  CognitoUserPoolSigninMethod2["EMAIL"] = "EMAIL";
  CognitoUserPoolSigninMethod2["PHONE_NUMBER"] = "PHONE_NUMBER";
  CognitoUserPoolSigninMethod2["EMAIL_AND_PHONE_NUMBER"] = "EMAIL_AND_PHONE_NUMBER";
  return CognitoUserPoolSigninMethod2;
})(CognitoUserPoolSigninMethod || {});
var CognitoUserAliasAttributes = /* @__PURE__ */ ((CognitoUserAliasAttributes2) => {
  CognitoUserAliasAttributes2["PREFERRED_USERNAME"] = "PREFERRED_USERNAME";
  CognitoUserAliasAttributes2["EMAIL"] = "EMAIL";
  CognitoUserAliasAttributes2["PHONE_NUMBER"] = "PHONE_NUMBER";
  return CognitoUserAliasAttributes2;
})(CognitoUserAliasAttributes || {});
var CognitoUserProperty = /* @__PURE__ */ ((CognitoUserProperty2) => {
  CognitoUserProperty2["ADDRESS"] = "ADDRESS";
  CognitoUserProperty2["BIRTHDATE"] = "BIRTHDATE";
  CognitoUserProperty2["EMAIL"] = "EMAIL";
  CognitoUserProperty2["FAMILY_NAME"] = "FAMILY_NAME";
  CognitoUserProperty2["MIDDLE_NAME"] = "MIDDLE_NAME";
  CognitoUserProperty2["GENDER"] = "GENDER";
  CognitoUserProperty2["LOCALE"] = "LOCALE";
  CognitoUserProperty2["GIVEN_NAME"] = "GIVEN_NAME";
  CognitoUserProperty2["NAME"] = "NAME";
  CognitoUserProperty2["NICKNAME"] = "NICKNAME";
  CognitoUserProperty2["PHONE_NUMBER"] = "PHONE_NUMBER";
  CognitoUserProperty2["PREFERRED_USERNAME"] = "PREFERRED_USERNAME";
  CognitoUserProperty2["PICTURE"] = "PICTURE";
  CognitoUserProperty2["PROFILE"] = "PROFILE";
  CognitoUserProperty2["UPDATED_AT"] = "UPDATED_AT";
  CognitoUserProperty2["WEBSITE"] = "WEBSITE";
  CognitoUserProperty2["ZONE_INFO"] = "ZONE_INFO";
  return CognitoUserProperty2;
})(CognitoUserProperty || {});
var CognitoUserPropertyVerified = /* @__PURE__ */ ((CognitoUserPropertyVerified2) => {
  CognitoUserPropertyVerified2["EMAIL_VERIFIED"] = "EMAIL_VERIFIED";
  CognitoUserPropertyVerified2["PHONE_NUMBER_VERIFIED"] = "PHONE_NUMBER_VERIFIED";
  return CognitoUserPropertyVerified2;
})(CognitoUserPropertyVerified || {});
export {
  CognitoPasswordConstraint,
  CognitoUserAliasAttributes,
  CognitoUserPoolSigninMethod,
  CognitoUserProperty,
  CognitoUserPropertyVerified
};
