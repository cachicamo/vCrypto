import React, { useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import {Auth, Hub} from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';


const image = require('../../assets/images/Saly-1.png');
const googleImage = require('../../assets/images/google-button.png');
const appleImage = require('../../assets/images/apple-button.png');

import styles from './styles';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if(user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ]
          })
        );
      }
      } catch (e) {
        console.log('No User Logged In')
      }
    }
    
    fetchUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if(event === "signIn"){
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
            ]
          })
        );
      }
    });
  }, [])
  

  const signInGoogle = async () => {
    await Auth.federatedSignIn({ provider: "Google" });
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
