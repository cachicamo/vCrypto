const { CognitoIdentityServiceProvider, DynamoDB } = require('aws-sdk');

// const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const ddb = new DynamoDB();

/**
 * Get user pool information from environment variables.
 */
// const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
// if (!COGNITO_USERPOOL_ID) {
//   throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
// }

// const COGNITO_USERNAME_CLAIM_KEY = 'cognito:username';

const getCoinAmount = async (coinPortfolioCoinId, userId) => {
  const params = {
    Key: {
      id: { S: coinPortfolioCoinId }
    },
    TableName: process.env.PORTFOLIO_COIN_TABLE
  }
  const coinData = await ddb.getItem(params).promise();
  console.log('portfolio coin data');
  console.log(coinData);

  //TODO CHECK if it is indeed USD coin, and belongs to user

  return coinData?.Item?.amount?.N || 0;
}

const getUSDAmount = async (usdPortfolioCoinId, userId) => {
  const params = {
    Key: {
      id: { S: usdPortfolioCoinId }
    },
    TableName: process.env.PORTFOLIO_COIN_TABLE
  }
  const coinData = await ddb.getItem(params).promise();
  console.log('USD coin data');
  console.log(coinData);
  //TODO CHECK if it is indeed USD coin, and belongs to user

  return coinData?.Item?.amount?.N || 0;
}

const getCoin = async (coinId) => {
  const params = {
    Key: {
      id: { S: coinId },
    },
    TableName: process.env.COIN_TABLE
  }
  const coinData = await ddb.getItem(params).promise();
  console.log('coin data');
  console.log(coinData);
}

const canBuyCoin = (coin, amountToBuy, usdAmount) => {
  return usdAmount >= coin.currentPrice * amountToBuy
}

const canSellCoin = (amountToSell, portfolioAmount) => {
  return portfolioAmount >= amountToSell
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
 const resolvers = {
    Mutation: {
      ExchangeCoins: async ctx => {
        console.log('ctx');
        console.log(ctx);
        const { coinId, isBuy, amount, usdPortfolioCoinId, coinPortfolioCoinId } = ctx.arguments;

        // var params = {
        //   UserPoolId: COGNITO_USERPOOL_ID, /* required */
        //   Username: ctx.identity.claims[COGNITO_USERNAME_CLAIM_KEY], /* required */
        // };
        // try {
        //   // Read more: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
        //   const userResponse =  await cognitoIdentityServiceProvider.adminGetUser(params).promise();
        //   console.log(userResponse);

        // } catch (e) {
        //   console.log(e);
        //   // throw new Error(`NOT FOUND`);
        // }

        if(isBuy && canBuyCoin()) {
          buyCoin();
        } else if (!isBuy && canSellCoin()) {
          sellCoin();
        } else {
          throw new Error(isBuy ? 'Not enough USD' : 'Not enough Coins to sell')
        }
        
        try {
          await getCoinAmount(ctx.arguments.coinPortfolioCoinId, ctx.identity.sub)
        } catch (e) {
          console.log('Error getting Coin amount');
          console.error(e);
        }

        try {
          await getCoin(ctx.arguments.coinId)
        } catch (e) {
          console.log('Error gettingCoin');
          console.error(e);
        }

        try {
          await getUSDAmount(ctx.arguments.usdPortfolioCoinId, ctx.identity.sub)
        } catch (e) {
          console.log('Error getting USDAmount');
          console.error(e);
        }
        return true;
      }
    },
  }

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
      const resolver = typeHandler[event.fieldName];
      if (resolver) {
        return await resolver(event);
      }
    }
    throw new Error("Resolver not found.");
  };