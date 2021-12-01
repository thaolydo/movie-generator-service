import DynamoDB from 'aws-sdk/clients/dynamodb';

export const MovieAccessor = async (event: any) => {
  const TABLE_NAME = 'movies';
  const dynamo = new DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: 'us-west-1',
  });

  let statusCode: number = 200;
  let body: any;

  try {
    switch (event.routeKey) {
      case 'GET /movies':
        body = await dynamo.scan({ TableName: TABLE_NAME }).promise();
        break;
      case 'GET /movies/{id}':
        body = await dynamo
          .get({
            TableName: TABLE_NAME,
            Key: { id: event.pathParameters.id },
          })
          .promise();
        break;
      case 'PUT /movies':
        let req = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: TABLE_NAME,
            Item: {
              title: req.title,
              id: req.id,
              genres: req.genres,
              director: req.director,
              stars: req.stars,
              dateReleased: req.dateReleased,
              rating: req.rating,
            },
          })
          .promise();
        body = `Put movie ${req.title}. ID: ${req.id}`;
        break;
      case 'DELETE /movies/{id}':
        await dynamo
          .delete({
            TableName: TABLE_NAME,
            Key: { id: event.pathParameters.id },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    console.info(body);
  }

  return { statusCode, body };
};
