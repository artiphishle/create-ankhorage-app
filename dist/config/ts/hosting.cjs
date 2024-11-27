"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/config/ts/hosting.ts
var hosting_exports = {};
__export(hosting_exports, {
  amplifyHosting: () => amplifyHosting,
  s3AndCloudFrontHosting: () => s3AndCloudFrontHosting
});
module.exports = __toCommonJS(hosting_exports);
var amplifyHosting = {
  hostingCategory: "amplifyhosting",
  targetBranch: "main",
  enablePullRequestPreview: true,
  repository: "https://github.com/username/repository"
};
var s3AndCloudFrontHosting = {
  hostingCategory: "S3AndCloudFront",
  bucketName: "my-custom-bucket-name",
  distributionName: "my-cloudfront-distribution",
  region: "us-east-1",
  indexDocument: "index.html",
  errorDocument: "index.html"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  amplifyHosting,
  s3AndCloudFrontHosting
});
