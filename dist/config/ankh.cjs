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

// src/config/ankh.ts
var ankh_exports = {};
__export(ankh_exports, {
  AnkhConfig: () => AnkhConfig
});
module.exports = __toCommonJS(ankh_exports);
var import_uuid = require("uuid");
var AnkhConfig = {
  auth: {
    mode: "IN_APP",
    cognito: {
      loginWith: {
        email: true
      },
      userAttributes: {
        "custom:firstName": {
          dataType: "String",
          mutable: true,
          minLen: 2,
          maxLen: 25
        },
        "custom:lastName": {
          dataType: "String",
          mutable: true,
          minLen: 2,
          maxLen: 25
        }
      }
    }
  },
  pages: [
    {
      id: (0, import_uuid.v4)(),
      name: "Home",
      route: "/",
      uis: [
        {
          id: (0, import_uuid.v4)(),
          name: "Text",
          conf: {
            value: "HomeText"
          }
        }
      ]
    },
    {
      id: (0, import_uuid.v4)(),
      name: "Profile",
      route: "/profile",
      uis: [
        {
          id: (0, import_uuid.v4)(),
          name: "Profile"
        }
      ]
    },
    {
      id: (0, import_uuid.v4)(),
      name: "Settings",
      route: "/settings",
      uis: [
        {
          id: (0, import_uuid.v4)(),
          name: "Settings"
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnkhConfig
});
