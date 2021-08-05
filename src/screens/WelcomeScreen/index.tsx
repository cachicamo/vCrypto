import React, { useContext, useEffect } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import {Auth, Hub} from 'aws-amplify';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";


const image = require('../../assets/images/Saly-1.png');
const googleImage = require('../../assets/images/google-button.png');
const appleImage = require('../../assets/images/apple-button.png');

import styles from './styles';
import AppContext from '../../utils/AppContext';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if(user) {
          setUserId(user.signInUserSession.accessToken.payload.sub);
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
        // console.log('No User Logged In')
      }
    }
    
    fetchUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if(event === "signIn"){
        setUserId(data.signInUserSession.accessToken.payload.sub);
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
    // await Auth.federatedSignIn({ provider: "Google" });
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google});
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
