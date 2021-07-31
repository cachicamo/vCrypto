import React, { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const image = require('../../assets/images/Saly-1.png');

import styles from './styles';
import PercentageChange from '../../components/PercentageChange';

const CoinDetailsScreen = () => {
  const [coinData, setCoinData] = useState({
    id: '1',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
    name: 'Ethereum',
    symbol: 'ETH',
    valueChange1H: -2.23,
    valueChange1D: 343.13,
    valueChange7D: -123.56,
    currentPrice: 2356.78,
    amount: 1.23,
  })

  const onStarPress = () => {
    console.warn('Add to Watch list');
  }

  const onBuy = () => {
    console.warn('Buy Coin');
  }
  const onSell = () => {
    console.warn('Sell Position');
  }

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <View style={styles.leftContainer}>
          <Image style={styles.image} source={{uri: coinData.image}} />
          <View>
            <Text style={styles.name}>{coinData.name}</Text>
            <Text style={styles.symbol}>{coinData.symbol}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Pressable onPress={onStarPress}>
            <AntDesign name={"staro"} size={30} color={'#2f95dc'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Current Price</Text>
          <Text style={styles.currentPrice}>${coinData.currentPrice}</Text>
        </View>

        <View style={styles.priceChangeContainer}>
          <View style={styles.changePercentageColumn}>
            <Text style={styles.label}>1 hour</Text>
            <PercentageChange value={coinData.valueChange1H} style={styles.currentPriceChange}/>
          </View>

          <View style={styles.changePercentageColumn}>
            <Text style={styles.label}>1 day</Text>
            <PercentageChange value={coinData.valueChange1D} style={styles.currentPriceChange}/>
          </View>

          <View style={styles.changePercentageColumn}>
            <Text style={styles.label}>7 days</Text>
            <PercentageChange value={coinData.valueChange7D} style={styles.currentPriceChange}/>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text>Position</Text>
        <Text>
          {coinData.symbol} {coinData.amount}
          {' '}
          (${(coinData.amount * coinData.currentPrice).toFixed(2)})
        </Text>
      </View>
      <View style={[styles.row, {marginTop: 'auto'}]}>
        <Pressable style={[styles.button, {backgroundColor: '#248500'}]} onPress={onBuy}>
          <Text style={styles.buttonText}>Buy</Text>
        </Pressable>
        <Pressable style={[styles.button, {backgroundColor: '#ff0000'}]} onPress={onSell}>
          <Text style={styles.buttonText}>Sell</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CoinDetailsScreen
