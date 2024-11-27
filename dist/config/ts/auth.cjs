"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/config/ts/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(auth_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});
