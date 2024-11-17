#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const dir = { config: resolve(__dirname, "config") };
const conf = {
  amplify: resolve(dir.config, "amplify.json"),
  auth: resolve(dir.config, "auth.json"),
  common: resolve(dir.config, "common.json")
};

function execSyncInherit(cmd, o = {}) {
  execSync(cmd, { ...o, stdio: 'inherit' });
}
function printTitle() {
  execSync("echo", { stdio: 'inherit' });
  execSync("echo A N K H O R A G E", { stdio: 'inherit' });
  execSync("echo - - - - - - - - -", { stdio: 'inherit' });
  execSync("echo", { stdio: 'inherit' });
};
async function getPromptData({ initialProjectName }) {
  const projectName = await prompts.input({
    type: "text",
    name: "projectName",
    message: "Enter the name of the project:",
    initial: initialProjectName
  });

  const accessKeyId = await prompts.input({
    type: "text",
    name: "accessKeyId",
    message: "Enter AWS Access Key ID:"
  });

  const secretAccessKey = await prompts.input({
    type: "text",
    name: "secretAccessKey",
    message: "Enter AWS Secret Access Key:"
  });

  return { projectName, accessKeyId, secretAccessKey };
}
function cloneBoilerplate({ boilerplate, projectName }) {
  execSync(`git clone ${boilerplate} ${projectName}`);
}
async function execAmplifyInit({ accessKeyId, aws: { region }, secretAccessKey, projectName, cwd }) {
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
  try {
    execSyncInherit(`amplify auth add --headless --profile amplify --config-file ${conf.auth} --debug`, { cwd });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
/**
 * Entrypoint
 */
(async function createApp() {
  const common = JSON.parse(fs.readFileSync(conf.common, "utf-8"));
  const { projectName, accessKeyId, secretAccessKey } = await getPromptData(common);
  const newCommon = { ...common, projectName };
  const cwd = resolve(process.cwd(), projectName);

  printTitle();
  cloneBoilerplate(newCommon);

  await execAmplifyInit({ ...newCommon, accessKeyId, secretAccessKey, cwd });

  // Optional features (see 'flags' in config/common.json)
  const { amplify: { flags } } = newCommon;

  flags.auth && execAmplifyAddAuth({ cwd });
  flags.push && execSyncInherit('amplify push', { cwd });
  flags.hosting && execSyncInherit('amplify hosting add', { cwd });
  flags.publish && execSyncInherit('amplify publish', { cwd });
})();