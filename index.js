#!/usr/bin/env node

require("dotenv").config();
const { readFileSync } = require("fs");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const execSyncInherit = (cmd, o = {}) => execSync(cmd, { ...o, stdio: 'inherit' });

async function getPromptData() {
  const initial = `ankh${uuidv4()}`;
  const projectName = await prompts.input({
    initial,
    type: "text",
    name: "projectName",
    message: "Enter the name of the project:",
  });
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID || await prompts.input({
    type: "text",
    name: "accessKeyId",
    message: "Enter AWS Access Key ID:",
    initial: ".env > AWS_ACCESS_KEY_ID"
  });
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || await prompts.input({
    type: "text",
    name: "secretAccessKey",
    message: "Enter AWS Secret Access Key:",
    initial: ".env > AWS_SECRET_ACCESS_KEY"
  });
  const region = process.env.AWS_REGION || await prompts.input({
    type: "text",
    name: "region",
    message: "Enter AWS Region:",
    initial: ".env > AWS_REGION"
  });

  return { projectName, accessKeyId, secretAccessKey, region };
}

async function init() {
  const dir = { conf: resolve(__dirname, "config") };
  const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
  const { projectName } = await getPromptData();
  const cwd = resolve(process.cwd(), projectName);

  execSyncInherit(`git clone ${boilerplate} ${projectName}`);
  execSyncInherit("npm i", { cwd });
  execSyncInherit(`npm add --save-dev @aws-amplify/backend@latest @aws-amplify/backend-cli@latest`, { cwd });
  execSyncInherit(`cp -r ${resolve(dir.conf, "amplify")} .`, { cwd });
  execSyncInherit("npx ampx configure telemetry disable", { cwd });
  execSyncInherit("npm update @aws-amplify/backend @aws-amplify/backend-cli", { cwd });

  /*
  const { amplify, frontend, providers } = JSON.parse(readFileSync(resolve(dir.conf, "amplify.json"), "utf-8"));
  providers.awscloudformation.region = region;
  providers.awscloudformation.accessKeyId = accessKeyId;
  providers.awscloudformation.secretAccessKey = secretAccessKey;

  execSyncInherit(`amplify init \
    --profile amplify \
    --amplify '${JSON.stringify({ ...amplify, projectName })}' \
    --frontend '${JSON.stringify(frontend)}' \
    --providers '${JSON.stringify(providers)}' \
    --yes`, { cwd });

  */
  execSyncInherit("echo ✅ Amplify init");

  return () => ({ cwd });

};

/**
 * Entrypoint
 */
(async () => {
  const { cwd } = await init();
  execSyncInherit("amplify push", { cwd });
  execSyncInherit("amplify publish", { cwd });
})();

// @todo check if cognito is created already (in theory yes do to amplify/ dir)
// @todo 'amplify add hosting'
// @todo 'amplify push'
// @todo 'amplify publish'
// @todo test signUp/signIn/signOut
// @todo add config to only add 'profile' if auth is enabled
// @todo clean out boilerplate...
// @todo use initials of user for avatar component
// @todo use identity-pool to upload avatar
// @todo add config to add pages
// @todo deploy a easy app (e.g. random color generator) to PlayStore
// @todo make sure web version doesn't look like a mobile phone app
// @todo build API's
// @todo support 'forgot password'
// @todo support 'edit profile'
// @todo support app auth mode: 'always' vs 'in-app'
// @todo deploy to AppStore (pay for Apple developer)
// @todo start with 'npm start'
// @todo app auto-restart automatically in Amplify?
// @todo distinguish environments
// @todo Deploy to custom domain
