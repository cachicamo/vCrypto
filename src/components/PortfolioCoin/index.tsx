import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import styles from './styles'

export interface PortfolioCoinProps {
  portfolioCoin: {
    id: string,
    image: string,
    name: string,
    symbol: string,
    amount: number,
    valueUSD: number, 
  }
}

const PortfolioCoin = (props: PortfolioCoinProps) => {
  const {
    portfolioCoin: {
      image, 
      name, 
      symbol, 
      amount, 
      valueUSD
    }, 
  } = props;

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails')} style={styles.root}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.valueUSD}>${valueUSD}</Text>
        <Text style={styles.amount}>{symbol} {amount}</Text>
      </View>
    </Pressable>
  )
}

export default PortfolioCoin
