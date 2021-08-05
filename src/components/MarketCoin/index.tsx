import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import PercentageChange from '../PercentageChange';
import styles from './styles'

export interface MarketCoinProps {
  marketCoin: {
    id: string,
    image: string,
    name: string,
    symbol: string,
    valueChange24H: number,
    currentPrice: number, 
  }
}

const MarketCoin = (props: MarketCoinProps) => {
  const {
    marketCoin: {
      id,
      image, 
      name, 
      symbol, 
      valueChange24H, 
      currentPrice
    }, 
  } = props;

  const navigation = useNavigation();

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
        <Text style={styles.valueUSD}>${currentPrice}</Text>
        <PercentageChange value={valueChange24H} />
        {/* <Text 
          style={{
            color: valueChange24H < 0 ? '#f10000' : valueChange24H > 0 ? '#398f0a' : '#000000'
          }}
          >
          {valueChange24H > 0 && '+'} {valueChange24H}
        </Text> */}
      </View>
    </Pressable>
  )
}

export default MarketCoin
