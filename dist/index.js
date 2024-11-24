"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const uuid_1 = require("uuid");
const prompts_1 = __importDefault(require("@inquirer/prompts"));
const child_process_1 = require("child_process");
const data_1 = require("aws-amplify/data");
const ankh_1 = require("./config/ankh");
dotenv_1.default.config();
const execSyncInherit = (cmd, o = {}) => (0, child_process_1.execSync)(cmd, { ...o, stdio: 'inherit' });
async function getPromptData() {
    const projectName = await prompts_1.default.input({
        default: `ankh${(0, uuid_1.v4)()}`,
        message: "Enter the name of the project:",
    });
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || await prompts_1.default.input({
        default: ".env > AWS_ACCESS_KEY_ID",
        message: "Enter AWS Access Key ID:",
    });
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || await prompts_1.default.input({
        default: ".env > AWS_SECRET_ACCESS_KEY",
        message: "Enter AWS Secret Access Key:",
    });
    const region = process.env.AWS_REGION || await prompts_1.default.input({
        default: ".env > AWS_REGION",
        message: "Enter AWS Region:",
    });
    return { projectName, accessKeyId, secretAccessKey, region };
}
async function init() {
    const dir = { conf: (0, path_1.resolve)(__dirname, "config") };
    const boilerplate = "https://github.com/artiphishle/ankh-native-app.git";
    const { projectName } = await getPromptData();
    const cwd = (0, path_1.resolve)(process.cwd(), projectName);
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
    execSyncInherit(`cp -r ${(0, path_1.resolve)(dir.conf, "amplify")} .`, { cwd });
    execSyncInherit(`cp ${(0, path_1.resolve)(dir.conf, "amplify_outputs.json")} .`, { cwd });
    execSyncInherit(`cp ${(0, path_1.resolve)(dir.conf, "ankh.ts")} ./conf`, { cwd });
    execSyncInherit(`npm i && npm add --save-dev ${pkgs.dev.join(" ")}`, { cwd });
    execSyncInherit("npx ampx configure telemetry disable", { cwd });
    execSyncInherit("npm update @aws-amplify/backend @aws-amplify/backend-cli", { cwd });
    execSyncInherit("amplify configure", { cwd });
    return { cwd };
}
;
async function createPages(pages) {
    const { models } = (0, data_1.generateClient)();
    const fns = pages.map((page) => () => models.Page.create(page));
    try {
        await Promise.allSettled(fns);
    }
    catch (error) {
        console.error(error);
    }
}
/**
 * ANKHORAGE
 * @entrypoint
 */
(async () => {
    // 1. Init Amplify app & Cognito
    const { cwd } = await init();
    // 2. Create app pages
    await createPages(ankh_1.AnkhConfig.pages);
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
