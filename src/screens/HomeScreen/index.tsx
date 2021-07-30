import React from 'react'
import { View, Text, Image } from 'react-native'
const image = require('../../assets/images/Saly-1.png');

import styles from './styles';

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title} >Welcome to VCrypto</Text>
      <Text style={styles.subtitle}>Invest your virtual $100,000</Text>
      <Text style={styles.subtitle}>and compete with others</Text>
    </View>
  )
}

export default HomeScreen
