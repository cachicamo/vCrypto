/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const exchangeMyCoin = /* GraphQL */ `
  mutation ExchangeMyCoin(
    $coinId: ID
    $isBuy: Boolean!
    $amount: Float!
    $usdPortfolioCoinId: ID!
    $coinPortfolioCoinId: ID
  ) {
    exchangeMyCoin(
      coinId: $coinId
      isBuy: $isBuy
      amount: $amount
      usdPortfolioCoinId: $usdPortfolioCoinId
      coinPortfolioCoinId: $coinPortfolioCoinId
    )
  }
`;
