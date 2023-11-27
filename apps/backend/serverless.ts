import type { AWS } from '@serverless/typescript';

import { analyzeText } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'vocabulary-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-offline-lambda-function-urls'],
  provider: {
    stage: "${opt:stage, 'development'}",
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs18.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: { analyzeText },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
};

module.exports = serverlessConfiguration;
