import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    margin: 10,
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symbol: {
    color: '#6b6b6b',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 220,
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#545454',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '600',
  },
  currentPriceChange: {
    fontSize: 15,
    paddingVertical: 4,
  },
  changePercentageColumn: {
    alignItems: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;