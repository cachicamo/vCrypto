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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;