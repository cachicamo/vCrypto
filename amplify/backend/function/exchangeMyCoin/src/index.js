/* Amplify Params - DO NOT EDIT
	API_VCRYPTO_GRAPHQLAPIENDPOINTOUTPUT
	API_VCRYPTO_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DynamoDB } = require('aws-sdk');

const ddb = new DynamoDB();

const getUsdAmount = async (usdPortfolioCoinId, userId) => {
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

  if (coinData && coinData.Item && coinData.Item.amount && coinData.Item.amount.N) {
    return parseFloat(coinData.Item.amount.N);
  }
  return 0;
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
  return coinData;
}

const getCoinAmount = async (coinPortfolioCoinId, userId) => {
  const params = {
    Key: {
      id: { S: coinPortfolioCoinId }
    },
    TableName: process.env.PORTFOLIO_COIN_TABLE
  }
  console.log('portfolio coin data');
  console.log(params)
  const coinData = await ddb.getItem(params).promise();
  console.log(coinData);

  // CHECK if it is indeed coin, and belongs to user
  if (coinData && coinData.Item && coinData.Item.amount && coinData.Item.amount.N) {
    return parseFloat(coinData.Item.amount.N);
  }
  return 0;
}

const canBuyCoin = (coin, amountToBuy, usdAmount) => {
  console.log('can buycoin')
  console.log(usdAmount)
  console.log(coin.Item.currentPrice.N)
  console.log(amountToBuy)
  return usdAmount >= parseFloat(coin.Item.currentPrice.N) * amountToBuy
}

const canSellCoin = (amountToSell, portfolioAmount) => {
  return portfolioAmount >= amountToSell
}

const buyCoin = async (
  coin,
  amountToBuy,
  usdPortfolioCoinId,
  usdAmount,
  coinAmount,
  userId) => {
    const date = new Date();
    // decrease USD
    const newUsdAmount = usdAmount - parseFloat(coin.Item.currentPrice.N) * amountToBuy;
    const params = {
        Item: {
            id: { S: usdPortfolioCoinId },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: process.env.USD_COIN_ID },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params).promise();

    // ADD new portfolio coin, or update the existing one
    const newCoinAmount = coinAmount + amountToBuy;
    const params1 = {
        Item: {
            id: { S: `${userId}-${coin.Item.symbol.S}` },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: coin.Item.id.S },
            'amount': { N: newCoinAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params1).promise();
}

const sellCoin = async (
  coin,
  amountToSell,
  usdPortfolioCoinId,
  usdAmount,
  coinAmount,
  userId) => {
    const date = new Date();
    // increase USD
    const newUsdAmount = usdAmount + parseFloat(coin.Item.currentPrice.N) * amountToSell;
    const params = {
        Item: {
            id: { S: usdPortfolioCoinId },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: process.env.USD_COIN_ID },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params).promise();

    // ADD new portfolio coin, or update the existing one
    const newCoinAmount = coinAmount - amountToSell;
    const params1 = {
        Item: {
            id: { S: `${userId}-${coin.Item.symbol.S}` },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: coin.Item.id.S },
            'amount': { N: newCoinAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params1).promise();
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
 const resolvers = {
    Mutation: {
      exchangeMyCoin: async ctx => {
        console.log('ctx');
        console.log(ctx);
        const { coinId, isBuy, amount, usdPortfolioCoinId, coinPortfolioCoinId } = ctx.arguments;

        const userId = ctx.identity.sub;

        const usdAmount = !usdPortfolioCoinId ? 0 : await getUsdAmount(usdPortfolioCoinId, userId)
        const coinAmount = !coinPortfolioCoinId ? 0 : await getCoinAmount(coinPortfolioCoinId, userId)
        const coin = await getCoin(coinId);

        if(isBuy && canBuyCoin(coin, amount, usdAmount)) {
          await buyCoin(coin, amount, usdPortfolioCoinId, usdAmount, coinAmount, userId);
        } 
        else if (!isBuy && canSellCoin(amount, coinAmount)) {
          await sellCoin(coin, amount, usdPortfolioCoinId, usdAmount, coinAmount, userId);
        } else {
          throw new Error(isBuy ? 'Not enough USD' : 'Not enough Coins to sell')
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
