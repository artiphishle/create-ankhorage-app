#!/usr/bin/env node

const fs = require("fs");
const { join } = require("path");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const dir = { config: join(__dirname, "config") };

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
  const { amplify, frontend, providers } = JSON.parse(fs.readFileSync(join(dir.config, "amplify.json"), "utf-8"));

  providers.awscloudformation.region = region;
  providers.awscloudformation.accessKeyId = accessKeyId;
  providers.awscloudformation.secretAccessKey = secretAccessKey;

  execSyncInherit(`amplify init \
    --amplify '${JSON.stringify({ ...amplify, projectName })}' \
    --frontend '${JSON.stringify(frontend)}' \
    --providers '${JSON.stringify(providers)}' \
    --yes`, { cwd });
}
function execAmplifyAddAuth({ cwd }) {
  const config = JSON.parse(fs.readFileSync(join(dir.config, "/auth.json"), "utf-8"));

  execSyncInherit(`amplify add auth --headless --categories '{"auth": ${JSON.stringify(config)}}'`, { cwd });
}
/**
 * Entrypoint
 */
(async function createApp() {
  const common = JSON.parse(fs.readFileSync(join(dir.config, "common.json"), "utf-8"));
  const { projectName, accessKeyId, secretAccessKey } = await getPromptData(common);
  const newCommon = { ...common, projectName };
  const cwd = join(process.cwd(), projectName);

  printTitle();
  cloneBoilerplate(newCommon);

  await execAmplifyInit({ ...newCommon, accessKeyId, secretAccessKey, cwd });

  // Optional features (see 'flags' in config/common.json)
  const { amplify: { flags } } = newCommon;

  execSync(`echo ">>>> flags.auth: ${flags.auth}"`, { cwd });
  execSync("echo", { cwd });
  execSync(`echo ${JSON.stringify(newCommon)}`, { cwd });

  flags.auth && execAmplifyAddAuth({ cwd });
  flags.push && execSyncInherit('amplify push', { cwd });
  flags.hosting && execSyncInherit('amplify hosting', { cwd });
  flags.publish && execSyncInherit('amplify publish', { cwd });
})();