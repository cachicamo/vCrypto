import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import {API, graphqlOperation} from 'aws-amplify';


import AppContext from '../../utils/AppContext';
import {getUser} from '../../graphql/queries';

const image = require('../../assets/images/Saly-1.png');

import styles from './styles';

const HomeScreen = () => {
  const { userId } = useContext(AppContext);
  const [userName, setUserName] = useState(null);
  
  const fetchUserData = async () => {
    try {
      const response = await API.graphql(graphqlOperation(getUser, { id: userId },));
      setUserName(response.data?.getUser.name);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title} >Welcome to VCrypto</Text>
      <Text style={styles.username}>{userName}</Text>
      <Text style={styles.subtitle}>Invest your virtual $100,000</Text>
      <Text style={styles.subtitle}>and compete with others</Text>
    </View>
  )
}

export default HomeScreen
