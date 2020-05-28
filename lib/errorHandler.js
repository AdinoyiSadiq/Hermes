import { AsyncStorage } from 'react-native';

const errorHandler = async (error, client) => {
  if (error && error.message === 'GraphQL error: unauthorized request, please login') {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.getItem('authToken');
    await client.cache.reset();
    await client.writeData({ data: { isAuth: false } });
  } else {
    console.log('Error: ', error.message);
  }
};

export default errorHandler;
