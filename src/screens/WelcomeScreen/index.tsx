import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
const image = require('../../assets/images/Saly-1.png');
const googleImage = require('../../assets/images/google-button.png');
const appleImage = require('../../assets/images/apple-button.png');

import styles from './styles';

const WelcomeScreen = () => {

  const signInGoogle = () => {
    console.warn('Sign in Google')
  };

  const signInApple = () => {
    console.warn('Sign in Apple')
  };

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title} >Welcome to VCrypto</Text>
      <Text style={styles.subtitle}>Invest your virtual $100,000</Text>
      <Text style={styles.subtitle}>and compete with others</Text>

      <Pressable onPress={signInApple} style={styles.appleButton}>
        <Image style={styles.googleImage} source={appleImage} />
      </Pressable>

      <Pressable onPress={signInGoogle} style={styles.googleButton}>
        <Image style={styles.googleImage} source={googleImage} />
      </Pressable>
    </View>
  )
}

export default WelcomeScreen
