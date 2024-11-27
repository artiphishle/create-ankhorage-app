#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import dotenv from "dotenv";
import { resolve } from "path";
import { v4 as v42 } from "uuid";
import { input } from "@inquirer/prompts";
import { execSync } from "child_process";
import { generateClient } from "aws-amplify/data";

// src/config/ankh.ts
import { v4 } from "uuid";
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
      id: v4(),
      name: "Home",
      route: "/",
      uis: [
        {
          id: v4(),
          name: "Text",
          conf: {
            value: "HomeText"
          }
        }
      ]
    },
    {
      id: v4(),
      name: "Profile",
      route: "/profile",
      uis: [
        {
          id: v4(),
          name: "Profile"
        }
      ]
    },
    {
      id: v4(),
      name: "Settings",
      route: "/settings",
      uis: [
        {
          id: v4(),
          name: "Settings"
        }
      ]
    }
  ]
};

// src/index.ts
dotenv.config();
var execSyncInherit = (cmd, o = {}) => execSync(cmd, __spreadProps(__spreadValues({}, o), { stdio: "inherit" }));
function getPromptData() {
  return __async(this, null, function* () {
    const projectName = yield input({
      default: `ankh${v42()}`,
      message: "Enter the name of the project:"
    });
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || (yield input({
      default: ".env > AWS_ACCESS_KEY_ID",
      message: "Enter AWS Access Key ID:"
    }));
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || (yield input({
      default: ".env > AWS_SECRET_ACCESS_KEY",
      message: "Enter AWS Secret Access Key:"
    }));
    const region = process.env.AWS_REGION || (yield input({
      default: ".env > AWS_REGION",
      message: "Enter AWS Region:"
    }));
    return { projectName, accessKeyId, secretAccessKey, region };
  });
}
function init() {
  return __async(this, null, function* () {
    const dir = { conf: resolve(__dirname, "config") };
    const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
    const { projectName } = yield getPromptData();
    const cwd = resolve(process.cwd(), projectName);
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
    execSyncInherit(`cp -r ${resolve(dir.conf, "amplify")} .`, { cwd });
    execSyncInherit(`cp ${resolve(dir.conf, "amplify_outputs.json")} .`, { cwd });
    execSyncInherit(`cp ${resolve(dir.conf, "ankh.ts")} ./conf`, { cwd });
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
    const { models } = generateClient();
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
