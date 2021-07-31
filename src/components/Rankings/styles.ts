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
  place: {
    fontSize: 18,
    width: 25,
    textAlign: 'center',
  },
  netWorth: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default styles;