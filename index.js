#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const prompts = require("@inquirer/prompts");

const createApp = async () => {
  // Step 1: Ask for the app name
  const appName = await prompts.input({
    type: "text",
    name: "appName",
    message: "Enter the name of the app:",
    initial: "ankhorage-app"
  });

  // Step 2: Clone Native App
  execSync(`git clone https://github.com/artiphishle/ankh-native-app.git ${appName}`);

  // Step 3: Install App, Amplify & Cognito
  execSync(`npm i && amplify init -y --debug && amplify auth`, { cwd: appName });
  console.log("Success!")
};

createApp();
