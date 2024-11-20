#!/usr/bin/env node

require("dotenv").config();
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const { writeFileSync } = require("fs");
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
  execSyncInherit(`cp -r ${resolve(dir.conf, "amplify")} .`, { cwd });
  execSyncInherit(`cp ${resolve(__dirname, "amplify_outputs.json")} .`, { cwd });
  execSyncInherit(`cp ${resolve(dir.conf, "ankh.json")} ./conf`, { cwd });

  execSyncInherit(`npm i && npm add --save-dev @aws-amplify/backend@latest @aws-amplify/backend-cli@latest aws-cdk aws-cdk-lib @aws-amplify/ui-react`, { cwd });
  execSyncInherit("npx ampx configure telemetry disable", { cwd });
  execSyncInherit("npm update @aws-amplify/backend @aws-amplify/backend-cli", { cwd });
  execSyncInherit("amplify configure", { cwd });
  return () => ({ cwd });
};

(async () => {
  const { cwd } = await init();

  /*
  execSync("npx ampx sandbox > .sandbox", { cwd });
  execSync("echo $! > .sandbox_pid", { cwd });
  const sandboxPid = readFileSync(".sandbox_pid", "utf8");
  const intVal = setInterval(async () => {
    const log = readFileSync(".sandbox", "utf8");
    if (log.includes("✨")) {
      clearInterval(intVal);

      execSyncInherit(`kill ${sandboxPid}`, { cwd });
      execSyncInherit("echo ✨✨✨✨✨✨✨✨✨✨✨");

      const flagDeployment = await prompts.input({
        type: "text",
        message: "Do you want to publish?",
        name: "startDeployment"
      });

      if (!flagDeployment) process.exit(0);

      (function deploy(cwd) {
        execSyncInherit("amplify pull", { cwd });
        execSyncInherit("amplify publish", { cwd });
      })(cwd);

    }
  }, 1000);
  */
})();