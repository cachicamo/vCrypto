import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Pressable, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

import { ExchangeCoins } from '../../graphql/mutations';
const image = require('../../assets/images/Saly-31.png');
import styles from './styles';

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('');
  const [coinUSDValue, setCoinUSDValue] = useState('');
  const [toUSD, setToUSD] = useState(true);
  const [toCoin, setToCoin] = useState(true);
  
  //TODO fetch from API
  const maxUSD = 100000;  

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

  const onPlaceOrder = () => {
    if(isBuy && parseFloat(coinUSDValue) > maxUSD) {
      Alert.alert('Error', `Not enough USD coins. Max: ${maxUSD}`);
      hideKeyboard();
      onClear();
      return;
    }
    if(!isBuy && (!isBuy || coinAmount > portfolioCoin.amount)) {
      Alert.alert('Error', `Not enough ${coin.symbol} coins. Max: ${coin.amount || 0}`);
      hideKeyboard();
      onClear();
      return;
    }
    if(parseFloat(coinAmount) > 0.00 || parseFloat(coinUSDValue) > 0.00) {
      hideKeyboard();
      placeOrder();
      onClear();
    } else {
      hideKeyboard();
    }
  };

  const placeOrder = async () => {
    try {
      const response = await API.graphql(graphqlOperation(
        ExchangeCoins, {
          coinId: coin.id,
          isBuy,
          amount: parseFloat(coinAmount),
        }));
    } catch (e) {
      console.error(e);
    }
  }

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
       
        <Text>Max. {isBuy ? maxUSD : coin.amount || 0}</Text>
      </View>
      {(coinAmount.length > 0) && (
        <View style={styles.row}>
          <Pressable onPress={onPlaceOrder} style={styles.button}>
            <Text style={styles.buttonText}>Place Order</Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

export default CoinExchangeScreen
