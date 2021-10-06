const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'watchlists';

const getWatchlists = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const watchlists = await dynamoClient.scan(params).promise();
  return watchlists;
};

const getWatchlistById = async (id) => {
  const params = { TableName: TABLE_NAME, Key: { id } };
  const watchlist = await dynamoClient.get(params).promise();
  return watchlist;
};

const addOrUpdateWatchlist = async (watchlist) => {
  const params = {
    TableName: TABLE_NAME,
    Item: watchlist,
  };
  return dynamoClient.put(params).promise();
};

const deleteWatchlist = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  return await dynamoClient.delete(params).promise();
};

module.exports = {
  getWatchlists,
  getWatchlistById,
  addOrUpdateWatchlist,
  deleteWatchlist,
};
