#!/usr/bin/env node

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
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();
var __dirname = dirname(fileURLToPath(import.meta.url));
var execSyncInherit = (cmd, o = {}) => execSync(cmd, { ...o, stdio: "inherit" });
async function getPromptData() {
  const projectName = await input({
    default: `ankh${v42()}`,
    message: "Enter the name of the project:"
  });
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID || await input({
    default: ".env > AWS_ACCESS_KEY_ID",
    message: "Enter AWS Access Key ID:"
  });
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || await input({
    default: ".env > AWS_SECRET_ACCESS_KEY",
    message: "Enter AWS Secret Access Key:"
  });
  const region = process.env.AWS_REGION || await input({
    default: ".env > AWS_REGION",
    message: "Enter AWS Region:"
  });
  return { projectName, accessKeyId, secretAccessKey, region };
}
async function init() {
  const dir = { conf: resolve(__dirname, "config") };
  const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
  const { projectName } = await getPromptData();
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
}
async function createPages(pages) {
  const { models } = generateClient();
  const fns = pages.map((page) => () => models.Page.create(page));
  try {
    await Promise.allSettled(fns);
  } catch (error) {
    console.error(error);
  }
}
(async () => {
  await init();
  await createPages(AnkhConfig.pages);
})();
