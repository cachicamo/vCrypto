import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import {API, graphqlOperation} from 'aws-amplify';

import {listUsers} from '../../graphql/queries';

import Rankings from '../../components/Rankings';
const image = require('../../assets/images/Saly-20.png');

import styles from './styles'

// const rankings = [
//   {
//     id: '1',
//     name: 'Virtual Dollars',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
//     netWorth: 69420
//   },
//   {
//     id: '2',
//     name: 'Bitcoin',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/5.jpg',
//     netWorth: 3420
//   },
//   {
//     id: '3',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '4',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '5',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     valueChange24H: 5.34,
//     netWorth: 69420.99
//   },
//   {
//     id: '6',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '7',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '8',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '9',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
//   {
//     id: '10',
//     name: 'Ethereum',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     netWorth: 69420.99
//   },
// ];

const RankingsScreen = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.graphql(graphqlOperation(listUsers));
      setRankings(response.data.listUsers.items);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
   fetchUsers();
  }, [])

  return (
    <View style={styles.root}>

      <FlatList 
        style={{width: '100%'}}
        data={rankings}
        onRefresh={fetchUsers}
        refreshing={loading}
        renderItem={({item, index}) => <Rankings rankings={item} place={index+1} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <Text style={styles.label} >Rankings</Text>
          </>
        )}
      />
    </View>
  )
}

export default RankingsScreen
