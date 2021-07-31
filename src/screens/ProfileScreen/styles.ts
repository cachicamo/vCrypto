import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 175,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  userimage: {
    height: 40,
    resizeMode: 'contain',
  },
  userContainer: {
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
  userImage: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  netWorth: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  signOut: {
    marginTop: 'auto',
  },
  signOutText: {
    fontSize: 24,
  }
});

export default styles;