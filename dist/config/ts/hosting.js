"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3AndCloudFrontHosting = exports.amplifyHosting = void 0;
const amplifyHosting = {
    hostingCategory: 'amplifyhosting',
    targetBranch: 'main',
    enablePullRequestPreview: true,
    repository: 'https://github.com/username/repository',
};
exports.amplifyHosting = amplifyHosting;
const s3AndCloudFrontHosting = {
    hostingCategory: 'S3AndCloudFront',
    bucketName: 'my-custom-bucket-name',
    distributionName: 'my-cloudfront-distribution',
    region: 'us-east-1',
    indexDocument: 'index.html',
    errorDocument: 'index.html',
};
exports.s3AndCloudFrontHosting = s3AndCloudFrontHosting;
