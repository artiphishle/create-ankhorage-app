#!/usr/bin/env node
import dotenv from 'dotenv';
import { resolve } from 'path';
import { v4 } from 'uuid';
import {input} from '@inquirer/prompts';
import { execSync } from 'child_process';
import { generateClient } from 'aws-amplify/data';
import { AnkhConfig } from './config/ankh';
import type { IAnkhPage } from './config/ankh';
import type { Schema } from './config/amplify/data/resource';

dotenv.config();
const execSyncInherit = (cmd: string, o = {}) =>
  execSync(cmd, { ...o, stdio: 'inherit' });

async function getPromptData() {
  const projectName = await input({
    default: `ankh${v4()}`,
    message: 'Enter the name of the project:',
  });
  const accessKeyId =
    process.env.AWS_ACCESS_KEY_ID ||
    (await input({
      default: '.env > AWS_ACCESS_KEY_ID',
      message: 'Enter AWS Access Key ID:',
    }));
  const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY ||
    (await input({
      default: '.env > AWS_SECRET_ACCESS_KEY',
      message: 'Enter AWS Secret Access Key:',
    }));
  const region =
    process.env.AWS_REGION ||
    (await input({
      default: '.env > AWS_REGION',
      message: 'Enter AWS Region:',
    }));

  return { projectName, accessKeyId, secretAccessKey, region };
}
async function init() {
  const dir = { conf: resolve(__dirname, 'config') };
  const boilerplate = 'https://github.com/artiphishle/ankh-native-app.git';
  const { projectName } = await getPromptData();
  const cwd = resolve(process.cwd(), projectName);
  const pkgs = {
    dev: [
      '@aws-amplify/backend@latest',
      '@aws-amplify/backend-cli@latest',
      '@aws-amplify/ui-react',
      'aws-cdk',
      'aws-cdk-lib',
    ],
  };

  execSyncInherit(`git clone ${boilerplate} ${projectName}`);
  execSyncInherit(`cp -r ${resolve(dir.conf, 'amplify')} .`, { cwd });
  execSyncInherit(`cp ${resolve(dir.conf, 'amplify_outputs.json')} .`, { cwd });
  execSyncInherit(`cp ${resolve(dir.conf, 'ankh.ts')} ./conf`, { cwd });

  execSyncInherit(`npm i && npm add --save-dev ${pkgs.dev.join(' ')}`, { cwd });
  execSyncInherit('npx ampx configure telemetry disable', { cwd });
  execSyncInherit('npm update @aws-amplify/backend @aws-amplify/backend-cli', {
    cwd,
  });
  execSyncInherit('amplify configure', { cwd });
  return { cwd };
}
async function createPages(pages: IAnkhPage[]) {
  const { models } = generateClient<Schema>();
  const fns = pages.map((page) => () => models.Page.create(page));

  try {
    await Promise.allSettled(fns);
  } catch (error) {
    console.error(error);
  }
}

/**
 * ANKHORAGE
 * @entrypoint
 */
(async () => {
  // 1. Init Amplify app & Cognito
  await init();

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

      const flagDeployment = await input({
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
