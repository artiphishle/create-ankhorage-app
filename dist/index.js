#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { input } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { generateClient } from 'aws-amplify/data';
import { AnkhConfig } from './config/ankh';
dotenv.config();
const execSyncInherit = (cmd, o = {}) => execSync(cmd, Object.assign(Object.assign({}, o), { stdio: 'inherit' }));
function getPromptData() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectName = yield input({
            default: `ankh${v4()}`,
            message: 'Enter the name of the project:',
        });
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID ||
            (yield input({
                default: '.env > AWS_ACCESS_KEY_ID',
                message: 'Enter AWS Access Key ID:',
            }));
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ||
            (yield input({
                default: '.env > AWS_SECRET_ACCESS_KEY',
                message: 'Enter AWS Secret Access Key:',
            }));
        const region = process.env.AWS_REGION ||
            (yield input({
                default: '.env > AWS_REGION',
                message: 'Enter AWS Region:',
            }));
        return { projectName, accessKeyId, secretAccessKey, region };
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = { conf: resolve(__dirname, 'config') };
        const boilerplate = 'https://github.com/artiphishle/ankh-native-app.git';
        const { projectName } = yield getPromptData();
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
    });
}
function createPages(pages) {
    return __awaiter(this, void 0, void 0, function* () {
        const { models } = generateClient();
        const fns = pages.map((page) => () => models.Page.create(page));
        try {
            yield Promise.allSettled(fns);
        }
        catch (error) {
            console.error(error);
        }
    });
}
/**
 * ANKHORAGE
 * @entrypoint
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Init Amplify app & Cognito
    yield init();
    // 2. Create app pages
    yield createPages(AnkhConfig.pages);
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
}))();
//# sourceMappingURL=index.js.map