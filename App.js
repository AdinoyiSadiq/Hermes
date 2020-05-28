/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';

import Signup from './screens/auth/Signup';
import Signin from './screens/auth/Signin';
import Home from './screens/Home';
import { navigationRef } from './navigation/RootNavigation';

import Colors from './constants/Colors';

import IS_AUTH_QUERY from './queries/isAuthenticated';

import createClient from './apollo';

const Stack = createStackNavigator();

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [token, setToken] = React.useState(false);
  useEffect(() => {
    let authToken;
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          Muli: require('./assets/fonts/Muli-Regular.ttf'),
          'Muli-Bold': require('./assets/fonts/Muli-Bold.ttf'),
        });
        authToken = await AsyncStorage.getItem('authToken');
      } catch (e) {
        console.warn(e);
      } finally {
        setToken(authToken);
        setLoadingComplete(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.colorWhite }
        }}
      >
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.colorWhite }
        }}
      >
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    );
  };

  const Switch = ({ isAuth }) => {
    return (
      <>
        { !isAuth && <AuthStack /> }
        { isAuth && <MainStack /> }
      </>
    );
  };

  return (
    <ApolloProvider client={createClient(token)}>
      <View style={styles.container}>
        <NavigationContainer ref={navigationRef}>
          <Query query={IS_AUTH_QUERY}>
            {({ data: { isAuth } }) => (
              <Switch isAuth={isAuth} />
            )}
          </Query>
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },
});
