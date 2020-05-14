import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/react-hooks';

import UserListWrapper from './userList/UserListWrapper';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';
import Loader from '../components/loaders/Loader';
import AuthUserContext from '../context/AuthUser';

import GET_ACTIVE_CHATS from '../queries/getActiveChats';

const Stack = createStackNavigator();

export default function Chats({ navigation, loading, authUserId }) {
  const {
    loading: activeChatsLoading, error: activeChatsError, data: activeChatsData
  } = useQuery(GET_ACTIVE_CHATS);

  const setTabBarVisibility = (state) => {
    navigation.setOptions({ tabBarVisible: state });
  };

  if (loading || !authUserId) {
    return (
      <View style={styles.loaderContainer}>
        <Loader color="orange" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.colorWhite },
      }}
    >
      <Stack.Screen name="activeChats">
        {(props) => {
          return (
            <AuthUserContext.Provider value={{ authUserId }}>
              <UserListWrapper
                type="chat"
                loading={activeChatsLoading}
                data={activeChatsData && activeChatsData.getActiveUsers}
                navigation={props.navigation}
              />
            </AuthUserContext.Provider>
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="messages">
        {(props) => {
          return (
            <Messages
              setTabBarVisibility={setTabBarVisibility}
              navigation={props.navigation}
              route={props.route}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="contactProfile">
        {(props) => {
          return (
            <ContactProfile
              navigation={props.navigation}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
});
