const { uuid } = require('uuidv4');

const aws = require('aws-sdk');
const dynamo = new aws.DyanmoDB.DocumentClient();
const TABLE_NAME = 'users';

exports.handler = async (event: any) => {
  let statusCode = 200;
  let body: any;
  const headers = {
    'Content-Type': 'application/json',
  };

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
          let token = uuid.v4();
          body.token = token;
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
        body = await dynamo.scan({
          TableName: TABLE_NAME,
        });
        break;
      case 'PUT /users':
        let req = JSON.parse(event.body);
        // if it is a new user then no id has been generated. this method
        if (!req.id) {
          req.id = uuid.v4();
        }
        await dynamo
          .put({
            TableName: TABLE_NAME,
            Item: {
              name: req.name,
              id: req.id,
              email: req.email,
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
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
