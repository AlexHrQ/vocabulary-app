import { APIGatewayProxyEvent } from 'aws-lambda';

export type InputEvent = APIGatewayProxyEvent & {
  body: Record<string, unknown>;
};
