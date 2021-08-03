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
      <View style={styles.buttonContainer}>
        <View style={styles.providerContainer}>
          <Pressable onPress={signInApple}>
            <Image style={styles.providerImage} source={appleImage} />
          </Pressable>
        </View>

        <View style={styles.providerContainer}>
          <Pressable onPress={signInGoogle}>
            <Image style={styles.providerImage} source={googleImage} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen
