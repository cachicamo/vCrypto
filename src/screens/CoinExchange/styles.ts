import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#5f5f5f'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#b1b1b1',
    paddingVertical: 15,
    paddingHorizontal: 5,
    flex: 1,
    margin: 15,
  },
  textInput: {

  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  maxValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 30,
  },
  clearButton: {
    marginLeft: 30,
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: '#2f952c',
    marginBottom: 100,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  }
});

export default styles;