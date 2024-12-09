#!/usr/bin/env node
import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { v4 } from 'uuid';
import { input } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { generateClient } from 'aws-amplify/data';
import 'react-native-paper';
import '@/lib/ui/components/List';
import '@/lib/ui/components/VideoPlayer';
import { fileURLToPath } from 'url';

// src/config/ankh.ts
var COLORS = {
  WHITE: "#fff",
  RED: "#cf1444",
  BLACK: "#000"
};
var AnkhConfig = {
  brand: {
    themes: [
      {
        name: "light",
        colors: {
          default: {
            text: COLORS.BLACK,
            bg: COLORS.WHITE
          },
          primary: {
            text: COLORS.WHITE,
            bg: COLORS.RED
          }
        },
        active: true,
        logo: "logo.jpg"
      }
    ]
  },
  auth: {
    mode: "IN_APP" /* InApp */,
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
      name: "index",
      route: "/",
      title: "Home",
      icon: "home"
    },
    {
      id: v4(),
      name: "profile",
      route: "/profile",
      title: "Profile",
      icon: "account"
    },
    {
      id: v4(),
      name: "lesson",
      route: "/lesson/1",
      title: "Lesson 1",
      icon: "school",
      uis: [
        {
          id: v4(),
          ui: "VideoPlayer" /* VideoPlayer */,
          props: {
            source: {
              uri: "http://localhost:8081/assets/videos/lesson-01.mp4"
            }
          }
        },
        {
          id: v4(),
          ui: "AnkhUiList" /* AnkhUiList */,
          props: {
            id: v4(),
            items: [
              {
                description: "Lorem ipsum and dollar Schein.",
                title: "Uno",
                icon: { left: "play-circle" }
              },
              {
                description: "Billie Gates wieder besser jetzt.",
                title: "Dos",
                icon: { left: "play-circle" }
              },
              {
                description: "Die drei b\xE4umen sich auf zu einer Triangle.",
                title: "Tree",
                icon: { left: "play-circle" }
              },
              {
                description: "Der Rosenquark ist ein essbarer Stein.",
                title: "Quark",
                icon: { left: "play-circle" }
              }
            ]
          }
        }
      ]
    },
    {
      id: v4(),
      name: "settings",
      route: "/settings",
      title: "Settings",
      icon: "cog"
    }
  ]
};
dotenv.config();
var __dirname = dirname(fileURLToPath(import.meta.url));
var execSyncInherit = (cmd, o = {}) => execSync(cmd, { ...o, stdio: "inherit" });
async function getPromptData() {
  const projectName = await input({
    default: `ankh${v4()}`,
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
  execSyncInherit(`npm i && npm add --save-dev ${pkgs.dev.join(" ")}`, { cwd });
  execSyncInherit("npx ampx configure telemetry disable", { cwd });
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
  execSyncInherit("echo \u2705 Init");
  await createPages(AnkhConfig.pages);
  execSyncInherit(`echo \u2705 Created ${AnkhConfig.pages.length} Pages`);
})();
