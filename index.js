#!/usr/bin/env node

require("dotenv").config();
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");
const prompts = require("@inquirer/prompts");
const { execSync } = require("child_process");
const { generateClient } = require("aws-amplify/data");
const { AnkhConfig } = require("./config/ankh");
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
  const pkgs = {
    dev: [
      "@aws-amplify/backend@latest",
      "@aws-amplify/backend-cli@latest",
      "@aws-amplify/ui-react",
      "aws-cdk",
      "aws-cdk-lib",
    ]
  };

  execSyncInherit(`git clone ${boilerplate} ${projectName}`);
  execSyncInherit(`cp -r ${resolve(dir.conf, "amplify")} .`, { cwd });
  execSyncInherit(`cp ${resolve(dir.conf, "amplify_outputs.json")} .`, { cwd });
  execSyncInherit(`cp ${resolve(dir.conf, "ankh.ts")} ./conf`, { cwd });

  execSyncInherit(`npm i && npm add --save-dev ${pkgs.dev.join(" ")}`, { cwd });
  execSyncInherit("npx ampx configure telemetry disable", { cwd });
  execSyncInherit("npm update @aws-amplify/backend @aws-amplify/backend-cli", { cwd });
  execSyncInherit("amplify configure", { cwd });
  return () => ({ cwd });
};
async function createPages(pages) {
  const { models: { Page } } = generateClient();
  const fns = pages.forEach((p) => function () { return Page.create(p) })

  try { await Promise.allSettled(fns); }
  catch (error) { console.error(error); }
}

/**
 * ANKHORAGE
 * @entrypoint
 */
(async () => {
  // 1. Init Amplify app & Cognito
  const { cwd } = await init();

  // 2. Create app pages
  await createPages(AnkhConfig.pages);

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