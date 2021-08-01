import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Pressable, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useRoute } from '@react-navigation/native';

const image = require('../../assets/images/Saly-31.png');

import styles from './styles';

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('');
  const [coinUSDValue, setCoinUSDValue] = useState('');
  const [toUSD, setToUSD] = useState(true);
  const [toCoin, setToCoin] = useState(true);
  
  const maxUSD = 100000;

  const route = useRoute();

  const isBuy = route?.params?.isBuy;
  const coinData = route?.params?.coinData;

  const onClear = () => {
    setCoinAmount('');
    setCoinUSDValue('');
    setToUSD(true);
    setToCoin(true);
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
    if(!isBuy && coinAmount > coinData.amount) {
      Alert.alert('Error', `Not enough ${coinData.symbol} coins. Max: ${coinData.amount}`);
      hideKeyboard();
      onClear();
      return;
    }
    if(parseFloat(coinAmount) > 0.00 || parseFloat(coinUSDValue) > 0.00) {
      hideKeyboard();
      console.warn('Place Order Goes Here!')
      onClear();
    } else {
      hideKeyboard();
    }
  };

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
      setCoinUSDValue((amount * coinData?.currentPrice).toFixed(2).toString());
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
      setCoinAmount((amount / coinData?.currentPrice).toFixed(8).toString());
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
        {coinData?.name}
      </Text>
      <Text style={styles.subtitle}>
        1 {coinData?.symbol}
        {' = '}
        ${coinData?.currentPrice}
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
          <Text>{coinData?.symbol}</Text>
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
        <Pressable onPress={onClear} style={styles.clearButton}>
          <Text>Clear</Text>
        </Pressable>
        <Text>Max. {isBuy ? maxUSD : coinData.amount}</Text>
      </View>
      <View style={[styles.row, {marginTop: 'auto'}]}>

      <Pressable onPress={onPlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CoinExchangeScreen
