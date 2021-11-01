import { UserAccessor } from '../accessors/user.accessor';

export const handler = async (event: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  const response = UserAccessor(event);
  let statusCode = (await response).statusCode;
  let body = (await response).body;

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
};
