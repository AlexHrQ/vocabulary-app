import { APIGatewayProxyResult } from 'aws-lambda';

import { middyfy, formatJSONResponse } from '@libs/lambda';

import type { InputEvent } from './types';
import vocabulary from './resources.json';

const getSearchPattern = (whitelist: string[]) => new RegExp(`(?:^|\\s)(${whitelist.join('|')})(?=\\s|$)`, 'gi');

const searchMap = {};

const getSearchMap = () => {
  Object.keys(vocabulary).forEach((key) => {
    searchMap[key] = getSearchPattern(vocabulary[key]);
  });
};

export const analyzeText = middyfy(async ({ body }: InputEvent): Promise<APIGatewayProxyResult> => {
  if (!body || !body.text || typeof body.text !== 'string' || !body.text.length) {
    return formatJSONResponse({
      status: 400,
      message: 'Input text is missing or invalid',
    });
  }

  if (!Object.keys(searchMap).length) {
    getSearchMap();
  }

  const result: Record<string, number> = {};
  const text = body.text.replace(/\n/g, ' ') as string;

  Object.keys(searchMap).forEach((key) => {
    result[key] = (text.match(searchMap[key]) || []).length;
  });

  return formatJSONResponse({
    status: 200,
    result,
  });
});
