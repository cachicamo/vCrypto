import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 175,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  balanceContainer: {
    marginVertical: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#707070',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default styles;