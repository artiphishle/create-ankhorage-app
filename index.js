#!/usr/bin/env node

require("dotenv").config();
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

  return { projectName, accessKeyId, secretAccessKey };
}

async function init() {
  const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
  const { projectName, accessKeyId, secretAccessKey } = await getPromptData();
  const cwd = resolve(process.cwd(), projectName);

  execSyncInherit(`git clone ${boilerplate} ${projectName}`);
  execSyncInherit("npm i", { cwd });
  execSyncInherit(`cp ${resolve(process.cwd(), "config/amplify")} ${cwd}`);

  const { amplify, frontend, providers } = JSON.parse(fs.readFileSync("config/amplify_old/amplify.json", "utf-8"));
  providers.awscloudformation.region = region;
  providers.awscloudformation.accessKeyId = accessKeyId;
  providers.awscloudformation.secretAccessKey = secretAccessKey;

  execSyncInherit(`amplify init \
    --profile amplify \
    --amplify '${JSON.stringify({ ...amplify, projectName })}' \
    --frontend '${JSON.stringify(frontend)}' \
    --providers '${JSON.stringify(providers)}' \
    --yes`, { cwd });

  execSyncInherit("echo ✅ Amplify init");

  return () => ({ cwd });

};

/**
 * Entrypoint
 */
(async () => {
  // 1 Amplify Init
  const { cwd } = await init();

  // 2 Amplify Push
  execSyncInherit("amplify push", { cwd });

  // 3 Amplify Publish
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