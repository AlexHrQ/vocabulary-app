import { handlerPath } from '@libs/handler-resolver';

export const analyzeText = {
  handler: `${handlerPath(__dirname)}/lexicalAnalyzer/index.analyzeText`,
  url: {
    cors: true,
  },
};
