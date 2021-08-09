import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify';

import { getUserPortfolio } from './queries';
import PortfolioCoin from '../../components/PortfolioCoin';
const image = require('../../assets/images/Saly-10.png');

import styles from './styles'
import AppContext from '../../utils/AppContext';

const PortfolioScreen = () => {
  const [balance, setBalance] = useState(0);
  const [portfolioCoins, setPortfolioCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AppContext);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await API.graphql(graphqlOperation(
        getUserPortfolio,
        { id: userId}
      ));
      setPortfolioCoins(response.data.getUser.porfolioCoins.items);
      portfolioCoins.map((item) => {
        // console.log('portfolio screen')
        // console.log(item)
      })
      setBalance(response.data.getUser.netWorth);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);
  
   // sort by name
   portfolioCoins.sort(function(a, b) {
    var nameA = a.coin.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.coin.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  

  return (
    <View style={styles.root}>

      <FlatList 
        style={{width: '100%'}}
        data={portfolioCoins}
        onRefresh={fetchPortfolio}
        refreshing={loading}
        renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label} >Portfolio balance</Text>
              <Text style={styles.balance} >${balance.toFixed(2)}</Text>
            </View>
          </>
        )}
      />
    </View>
  )
}

export default PortfolioScreen
