import { Auth } from 'aws-amplify';
import React, {useContext, useEffect, useState} from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

import AppContext from '../../utils/AppContext';
const image = require('../../assets/images/Saly-16.png');
import styles from './styles';
import { getUser } from '../../graphql/queries';


const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const { userId } = useContext(AppContext);

  const navigation = useNavigation();


  const signOut = async () => {
    await Auth.signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Welcome' },
       ]
      })
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.graphql(graphqlOperation(getUser, { id: userId },));
        setUser(response.data?.getUser);
      } catch (e) {
        console.error(e);
      }
    }

    fetchUserData();
  }, [])

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <View style={styles.userContainer}>
        <View style={styles.leftContainer}>
          <Image style={styles.userImage} source={{uri: user?.image}} />
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.netWorth}>${user?.netWorth.toFixed(2)}</Text>
        </View>
      </View>
      <Pressable onPress={signOut} style={styles.signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen
