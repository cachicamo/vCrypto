import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import PortfolioCoin from '../../components/PortfolioCoin';
import { listCoins } from '../../graphql/queries';
const image = require('../../assets/images/Saly-10.png');

import styles from './styles'

// const portfolioCoins = [
//   {
//     id: '1',
//     name: 'Virtual Dollars',
//     symbol: 'USD',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
//     amount: 69420,
//     valueUSD: 69420
//   },
//   {
//     id: '2',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/5.jpg',
//     amount: 1.12,
//     valueUSD: 3420
//   },
//   {
//     id: '3',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '4',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '5',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '6',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '7',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '8',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '9',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
//   {
//     id: '10',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
//     amount: 5.34,
//     valueUSD: 69420.99
//   },
// ];

const PortfolioScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await API.graphql(graphqlOperation(listCoins));
      setCoins(response.data.listCoins.items);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins();
  }, []);
  
  return (
    <View style={styles.root}>

      <FlatList 
        style={{width: '100%'}}
        data={coins}
        onRefresh={fetchCoins}
        refreshing={loading}
        renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label} >Portfolio balance</Text>
              <Text style={styles.balance} >$69,420</Text>
            </View>
          </>
        )}
      />
    </View>
  )
}

export default PortfolioScreen
