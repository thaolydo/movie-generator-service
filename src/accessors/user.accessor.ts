import { v4 as uuidv4 } from 'uuid';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export const UserAccessor = async (event: any) => {
  const TABLE_NAME = 'users';
  const dynamo = new DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: 'us-west-1',
  });

  let statusCode: number = 200;
  let body: any;

  try {
    switch (event.routeKey) {
      // generates a token, or a random password that the user will use as a temporary password
      case 'GET /users/forgot-password/{id}':
        const user = await dynamo
          .get({
            TableName: TABLE_NAME,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        // generates a token if there exists a user in the user table
        if (user) {
          const token: string = uuidv4();
          body = token;
        }
        break;
      case 'DELETE /users/{id}':
        await dynamo
          .delete({
            TableName: TABLE_NAME,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case 'GET /users/{id}':
        body = await dynamo
          .get({
            TableName: TABLE_NAME,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;
      case 'GET /users':
        body = await dynamo.scan({ TableName: TABLE_NAME }).promise();
        break;
      case 'PUT /users':
        let req = JSON.parse(event.body);
        // if it is a new user then no id has been generated. this method
        if (!req.id) {
          req.id = uuidv4();
        }
        await dynamo
          .put({
            TableName: TABLE_NAME,
            Item: {
              firstName: req.firstName,
              lastName: req.lastName,
              id: req.id,
              email: req.email,
              watchlist: req.watchlist,
            },
          })
          .promise();
        body = `Put user ${req.id}`;
        break;
      default:
        throw new Error(`Unsupported route "${event.routeKey}""`);
    }
  } catch (err: any) {
    statusCode = 400;
    body = err.message;
  } finally {
    console.info(body);
  }

  return { statusCode, body };
};
