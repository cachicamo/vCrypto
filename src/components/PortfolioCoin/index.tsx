import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import styles from './styles'

export interface PortfolioCoinProps {
  portfolioCoin: {
    amount: number,
    coin: {
      id: string,
      image: string,
      name: string,
      symbol: string,
      currentPrice: number, 
    }
  }
}

const PortfolioCoin = (props: PortfolioCoinProps) => {
  const {
    portfolioCoin: {
      
      amount,
      coin: {
        id,
        image, 
        name, 
        symbol, 
        currentPrice,
      }
    }, 
  } = props;

  const navigation = useNavigation();

  // do not show coin with 0 amount
  if (amount === 0) return null;

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails', { id })} style={styles.root}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.valueUSD}>${(amount * currentPrice).toFixed(2)}</Text>
        <Text style={styles.amount}>{symbol} {symbol === 'USD' ? amount.toFixed(2) : amount.toFixed(6)}</Text>
      </View>
    </Pressable>
  )
}

export default PortfolioCoin
