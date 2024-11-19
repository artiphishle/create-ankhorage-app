#!/usr/bin/env node

require("dotenv").config();
const fs = require("fs");
const { resolve } = require("path");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const dir = { config: resolve(__dirname, "config/amplify") };
const conf = {
  amplify: resolve(dir.config, "amplify.json"),
  auth: resolve(dir.config, "auth.json"),
  common: resolve(dir.config, "common.json")
};

function execSyncAwsHeadless(cmd, jsonConfig, o = {}) {
  execSyncInherit(`cat ${jsonConfig} | jq -c | ${cmd} --headless`, o);
}
function execSyncInherit(cmd, o = {}) {
  execSync(cmd, { ...o, stdio: 'inherit' });
}
function printTitle() {
  execSyncInherit("echo");
  execSyncInherit("echo A N K H O R A G E");
  execSyncInherit("echo - - - - - - - - -");
  execSyncInherit("echo");
};
async function getPromptData({ initialProjectName }) {
  const projectName = await prompts.input({
    type: "text",
    name: "projectName",
    message: "Enter the name of the project:",
    initial: initialProjectName
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
function cloneBoilerplate({ boilerplate, projectName }) {
  execSyncInherit(`git clone ${boilerplate} ${projectName}`);
}
function execAmplifyInit({ accessKeyId, aws: { region }, secretAccessKey, projectName, cwd }) {
  const { amplify, frontend, providers } = JSON.parse(fs.readFileSync(conf.amplify, "utf-8"));

  providers.awscloudformation.region = region;
  providers.awscloudformation.accessKeyId = accessKeyId;
  providers.awscloudformation.secretAccessKey = secretAccessKey;

  execSyncInherit(`amplify init \
    --profile amplify \
    --amplify '${JSON.stringify({ ...amplify, projectName })}' \
    --frontend '${JSON.stringify(frontend)}' \
    --providers '${JSON.stringify(providers)}' \
    --yes`, { cwd });
}
function execAmplifyAddAuth({ cwd }) {
  execSyncAwsHeadless("amplify add auth", conf.auth, { cwd })
}
/**
 * Entrypoint
 */
(async function createApp() {
  printTitle();

  const common = JSON.parse(fs.readFileSync(conf.common, "utf-8"));
  const { amplify: { flags } } = common;
  const { projectName, accessKeyId, secretAccessKey } = await getPromptData(common);

  const newCommon = { ...common, projectName, accessKeyId, secretAccessKey };
  cloneBoilerplate(newCommon);

  const cwd = resolve(process.cwd(), projectName);
  execAmplifyInit({ ...newCommon, cwd });

  flags.auth && execAmplifyAddAuth({ cwd });
  flags.hosting && execSyncInherit('amplify add hosting', { cwd });
  flags.push && execSyncInherit('amplify push', { cwd });
  flags.publish && execSyncInherit('amplify publish', { cwd });
})();