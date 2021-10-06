const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'users';

const getUsers = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const users = await dynamoClient.scan(params).promise();
  console.log(users);
  return users;
};

const getUserById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const user = await dynamoClient.get(params).promise();
  console.log(user);
  return user;
};

const addOrUpdateUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };
  return await dynamoClient.put(params).promise();
};

const deleteUser = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  return await dynamoClient.delete(params).promise();
};

module.exports = { getUsers, getUserById, addOrUpdateUser, deleteUser };
