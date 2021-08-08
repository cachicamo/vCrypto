import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Pressable, Alert, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

import { exchangeMyCoin } from './mutations';
const image = require('../../assets/images/Saly-31.png');
import styles from './styles';
import AppContext from '../../utils/AppContext';
import {listPortfolioCoins} from "../../graphql/queries";

const USD_COIN_ID = '9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0eee';

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('');
  const [coinUSDValue, setCoinUSDValue] = useState('');
  const [toUSD, setToUSD] = useState(true);
  const [toCoin, setToCoin] = useState(true);
  const [usdPortfolioCoin, setUsdPortfolioCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation();

  const { userId } = useContext(AppContext);

  const route = useRoute();

  const isBuy = route?.params?.isBuy;
  const coin = route?.params?.coin;
  const portfolioCoin = route?.params?.portfolioCoin;

  const onClear = () => {
    setCoinAmount('');
    setCoinUSDValue('');
    setToUSD(true);
    setToCoin(true);
    hideKeyboard();
  };

  const hideKeyboard = () => {
    // Hide that keyboard!
    Keyboard.dismiss()
  };

  const onSellAll = () => {
    setCoinAmount((portfolioCoin.amount).toString());
  }

  const onBuyAll = () => {
    setCoinUSDValue(((usdPortfolioCoin?.amount).toString()) || 0);
  }

  const onPlaceOrder = async () => {
    const maxUSD = usdPortfolioCoin?.amount || 0;
    if(isBuy && parseFloat(coinUSDValue) > maxUSD) {
      Alert.alert('Error', `Not enough USD coins. Max: ${maxUSD}`);
      hideKeyboard();
      onClear();
      return;
    }
    if(!isBuy && coinAmount > portfolioCoin.amount) {
      Alert.alert('Error', `Not enough ${coin.symbol} coins. Max: ${portfolioCoin.amount || 0}`);
      hideKeyboard();
      onClear();
      return;
    }
    if(parseFloat(coinAmount) > 0.00 || parseFloat(coinUSDValue) > 0.00) {
      hideKeyboard();
      await placeOrder();
      onClear();
    } else {
      hideKeyboard();
    }
  };

  const placeOrder = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const variables = {
        coinId: coin.id,
        isBuy,
        amount: parseFloat(coinAmount),
        usdPortfolioCoinId: usdPortfolioCoin?.id,
        coinPortfolioCoinId: portfolioCoin?.id,
      }
      const response = await API.graphql(graphqlOperation(
        exchangeMyCoin, variables)
      )
      if (response.data.exchangeMyCoin) {
        navigation.navigate('Portfolio');
      } else {
        Alert.alert('Error', 'There was an error exchanging coins');
      }
      
    } catch (e) {
      Alert.alert('Error', 'There was an error exchanging coins');
      console.error(e);
    }
    setIsLoading(false);
  }

  const getUSDPortfolioCoin = async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listPortfolioCoins,
          { filter: {
              and: {
                coinId: { eq: USD_COIN_ID },
                userId: { eq: userId }
              }
            }}
        )
      )
      // console.log('getUSDPortfolioCoin')
      // console.log(response)
      if (response.data.listPortfolioCoins.items.length > 0) {
        setUsdPortfolioCoin(response.data.listPortfolioCoins.items[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUSDPortfolioCoin();
  }, [])

  useEffect(() => {
    const amount = parseFloat(coinAmount)
    if (!amount && amount !== 0) {
      setCoinAmount('');
      setCoinUSDValue('');
      return;
    }
    if (!coinUSDValue) {
      setToUSD(true)
      setToCoin(false)
    }
    if (toUSD) {
      setCoinUSDValue((amount * coin?.currentPrice).toFixed(2).toString());
    }
  }, [coinAmount])

  useEffect(() => {
    const amount = parseFloat(coinUSDValue)
    if (!amount && amount !== 0) {
      setCoinAmount('');
      setCoinUSDValue('');
      return;
    }
    if (!coinAmount) {
      setToUSD(false)
      setToCoin(true)
    }
    if (toCoin) {
      setCoinAmount((amount / coin?.currentPrice).toFixed(8).toString());
    }
  }, [coinUSDValue])

  // console.log(usdPortfolioCoin)
  return (
    <KeyboardAvoidingView 
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height" }
      keyboardVerticalOffset={-10} 
      // onPress={hideKeyboard}
      >
      <Text style={styles.title}>
        {isBuy ? 'Buy' : 'Sell'}
        {' '}
        {coin?.name}
      </Text>
      <Text style={styles.subtitle}>
        1 {coin?.symbol}
        {' = '}
        ${coin?.currentPrice}
      </Text>
      <Image style={styles.image} source={image} />

      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
            <TextInput
              editable={toUSD}
              keyboardType='numeric'
              clearTextOnFocus={true}
              placeholder="0"
              value={coinAmount}
              onChangeText={setCoinAmount}
              />
          <Text>{coin?.symbol}</Text>
        </View>
        <Text style={{fontSize: 30}}>=</Text>
        <View style={styles.inputContainer}>
          <TextInput
            editable={toCoin}
            keyboardType="decimal-pad"
            clearTextOnFocus={true}
            placeholder='0'
            value={coinUSDValue}
            onChangeText={setCoinUSDValue}
            />
          <Text>USD</Text>
        </View>
      </View>
      <View style={styles.maxValue}>
        {(coinAmount.length > 0) && (
           <Pressable onPress={onClear} style={styles.clearButton}>
          <Text>Clear</Text>
        </Pressable>
        )}
        {!(coinAmount.length > 0) && (
          <View></View>
        )}
        <Text>Max. {isBuy ? usdPortfolioCoin?.amount : portfolioCoin.amount.toFixed(8) || 0}</Text>
      </View>
      {isBuy ? (
        <Pressable onPress={onBuyAll}>
          <Text style={{color: '#0097ff'}}>Buy max</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onSellAll}>
          <Text style={{color: '#0097ff'}}>Sell all</Text>
        </Pressable>
      )}
      {(coinAmount.length > 0) && (
        <View style={styles.row}>
          <Pressable onPress={onPlaceOrder} style={styles.button}>
            <Text style={styles.buttonText}>Place Order</Text>
            {isLoading && <ActivityIndicator color={'white'} />}
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

export default CoinExchangeScreen
