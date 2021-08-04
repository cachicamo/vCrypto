import { Auth } from 'aws-amplify';
import React, {useState} from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native';

const image = require('../../assets/images/Saly-16.png');

import styles from './styles';


const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    id: '1',
    name: 'Jesus',
    email: 'jporrello@gmail.com',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    netWorth: 65923.54,
  })

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

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={image} />
      <View style={styles.userContainer}>
        <View style={styles.leftContainer}>
          <Image style={styles.userImage} source={{uri: user.image}} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.netWorth}>${user.netWorth}</Text>
        </View>
      </View>
      <Pressable onPress={signOut} style={styles.signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen
