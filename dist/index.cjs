#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = require("path");
var import_uuid2 = require("uuid");
var import_prompts = require("@inquirer/prompts");
var import_child_process = require("child_process");
var import_data = require("aws-amplify/data");

// src/config/ankh.ts
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

// src/index.ts
import_dotenv.default.config();
var execSyncInherit = (cmd, o = {}) => (0, import_child_process.execSync)(cmd, __spreadProps(__spreadValues({}, o), { stdio: "inherit" }));
function getPromptData() {
  return __async(this, null, function* () {
    const projectName = yield (0, import_prompts.input)({
      default: `ankh${(0, import_uuid2.v4)()}`,
      message: "Enter the name of the project:"
    });
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || (yield (0, import_prompts.input)({
      default: ".env > AWS_ACCESS_KEY_ID",
      message: "Enter AWS Access Key ID:"
    }));
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || (yield (0, import_prompts.input)({
      default: ".env > AWS_SECRET_ACCESS_KEY",
      message: "Enter AWS Secret Access Key:"
    }));
    const region = process.env.AWS_REGION || (yield (0, import_prompts.input)({
      default: ".env > AWS_REGION",
      message: "Enter AWS Region:"
    }));
    return { projectName, accessKeyId, secretAccessKey, region };
  });
}
function init() {
  return __async(this, null, function* () {
    const dir = { conf: (0, import_path.resolve)(__dirname, "config") };
    const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
    const { projectName } = yield getPromptData();
    const cwd = (0, import_path.resolve)(process.cwd(), projectName);
    const pkgs = {
      dev: [
        "@aws-amplify/backend@latest",
        "@aws-amplify/backend-cli@latest",
        "@aws-amplify/ui-react",
        "aws-cdk",
        "aws-cdk-lib"
      ]
    };
    execSyncInherit(`git clone ${boilerplate} ${projectName}`);
    execSyncInherit(`cp -r ${(0, import_path.resolve)(dir.conf, "amplify")} .`, { cwd });
    execSyncInherit(`cp ${(0, import_path.resolve)(dir.conf, "amplify_outputs.json")} .`, { cwd });
    execSyncInherit(`cp ${(0, import_path.resolve)(dir.conf, "ankh.ts")} ./conf`, { cwd });
    execSyncInherit(`npm i && npm add --save-dev ${pkgs.dev.join(" ")}`, { cwd });
    execSyncInherit("npx ampx configure telemetry disable", { cwd });
    execSyncInherit("npm update @aws-amplify/backend @aws-amplify/backend-cli", {
      cwd
    });
    execSyncInherit("amplify configure", { cwd });
    return { cwd };
  });
}
function createPages(pages) {
  return __async(this, null, function* () {
    const { models } = (0, import_data.generateClient)();
    const fns = pages.map((page) => () => models.Page.create(page));
    try {
      yield Promise.allSettled(fns);
    } catch (error) {
      console.error(error);
    }
  });
}
(() => __async(void 0, null, function* () {
  yield init();
  yield createPages(AnkhConfig.pages);
}))();
