// src/config/ts/hosting.ts
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
export {
  amplifyHosting,
  s3AndCloudFrontHosting
};
