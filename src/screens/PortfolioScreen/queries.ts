export const getUserPortfolio = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      netWorth
      porfolioCoins {
        items {
          id
          amount
          coin {
            id
            name
            symbol
            image
            currentPrice
          }
        }
        nextToken
      }
    }
  }
`;