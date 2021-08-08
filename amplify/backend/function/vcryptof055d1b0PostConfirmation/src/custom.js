const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No user was written to DynamoDB');
    context.done(null, event);
    return;
  }

  // Save the user to DynamoDB
  const date = new Date();

  const Item = {
    id: {S: event.request.userAttributes.sub},
    __typename: {S: 'User'},
    email: {S: event.request.userAttributes.email},
    netWorth: {N: "100000.0"},
    createdAt: {S: date.toISOString()},
    updatedAt: {S: date.toISOString()},
  }

  if(event.request.userAttributes.picture) {
    Item.image = {S: event.request.userAttributes.picture};
  }

  if(event.request.userAttributes.name) {
    Item.name = {S: event.request.userAttributes.name};
  }

  const params = {
    Item,
    TableName: process.env.USERTABLE, //env variable in lambda
  };

  try {
    await ddb.putItem(params).promise();
    console.log('Success');
  } catch (e) {
    console.log('Error', e);
  }

  // Give user $100000
  const PortfolioCoinItem = {
    id: {S: `${event.request.userAttributes.sub}-usd`},
    __typename: {S: 'PortfolioCoin'},
    'userId': {S: event.request.userAttributes.sub},
    amount: {N: "100000.0"},
    'coinId': { S: process.env.USD_COIN_ID}, //env variable in lambda
    createdAt: {S: date.toISOString()},
    updatedAt: {S: date.toISOString()}
  }

  try {
    await ddb.putItem({
      Item: PortfolioCoinItem,
      TableName: process.env.PORTFOLIO_COIN_TABLE, //env variable in lambda
    }).promise();
    console.log('Success');
  } catch (e) {
    console.log('Error', e);
  }
  
  if(context?.done) context.done(null, event)
 
};
