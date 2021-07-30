import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    margin: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symbol: {
    color: '#6b6b6b',
  },
  valueUSD: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  amount: {

  },
});

export default styles;