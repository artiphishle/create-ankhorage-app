#!/usr/bin/env node

const { execSync } = require("child_process");
const prompts = require("@inquirer/prompts");

const writeTitle = () => {
  execSync("echo", { stdio: 'inherit' });
  execSync("echo A N K H O R A G E", { stdio: 'inherit' });
  execSync("echo - - - - - - - - -", { stdio: 'inherit' });
  execSync("echo", { stdio: 'inherit' });
};

const createApp = async () => {
  writeTitle();

  if (!process.env.AMPLIFY_ACCESS_KEY_ID) {
    execSync("echo Missing env: AMPLIFY_ACCESS_KEY_ID");
    process.exit(1);
  }
  if (!process.env.AMPLIFY_SECRET_ACCESS_KEY) {
    execSync("echo Missing env: AMPLIFY_SECRET_ACCESS_KEY");
    process.exit(1);
  }

  // Step 1: Ask for the app name
  const appName = await prompts.input({
    type: "text",
    name: "appName",
    message: "Enter the name of the app:",
    initial: "ankhorage-app"
  });

  // Step 2: Clone Native App
  execSync(`git clone https://github.com/artiphishle/ankh-native-app.git ${appName}`);

  // Step 3: Install App, Amplify, Cognito & publish
  execSync(`npm i && amplify init && amplify add auth && amplify push && amplify hosting && amplify publish`, { cwd: appName, stdio: 'inherit' });
};

createApp();
