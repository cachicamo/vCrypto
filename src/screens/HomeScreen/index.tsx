import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'

import AppContext from '../../utils/AppContext';
const image = require('../../assets/images/Saly-1.png');

import styles from './styles';

const HomeScreen = () => {
  const { userId } = useContext(AppContext);
  
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title} >Welcome to VCrypto</Text>
      <Text>{userId}</Text>
      <Text style={styles.subtitle}>Invest your virtual $100,000</Text>
      <Text style={styles.subtitle}>and compete with others</Text>
    </View>
  )
}

export default HomeScreen
