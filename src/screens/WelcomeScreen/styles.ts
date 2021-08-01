import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: '40%',
    aspectRatio: 1,
    backgroundColor: 'white'
  },
  title: {
    marginTop: 50,
    marginBottom: 15,
    fontSize:24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize:20,
    color: '#707070',
  },
  appleButton: {
    marginTop: 50,
  },
  googleButton: {
    marginBottom: 10,
  },
  googleImage: {
    height: 100,
    width: 220,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
});

export default styles;