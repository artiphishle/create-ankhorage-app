declare const amplifyHosting: {
    hostingCategory: string;
    targetBranch: string;
    enablePullRequestPreview: boolean;
    repository: string;
};
declare const s3AndCloudFrontHosting: {
    hostingCategory: string;
    bucketName: string;
    distributionName: string;
    region: string;
    indexDocument: string;
    errorDocument: string;
};

export { amplifyHosting, s3AndCloudFrontHosting };
