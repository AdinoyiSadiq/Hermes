import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import UserListWrapper from './userList/UserListWrapper';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';
import Loader from '../components/loaders/Loader';
import UserContext from '../context/User';

import GET_ACTIVE_CHATS from '../queries/getActiveChats';
import GET_CONTACT_PROFILE from '../queries/getContactProfile';

const Stack = createStackNavigator();

export default function Chats({ navigation, loading, authUserId }) {
  const {
    loading: activeChatsLoading, error: activeChatsError, data: activeChatsData
  } = useQuery(GET_ACTIVE_CHATS);
  const [getContactProfile,
    { loading: contactProfileLoading, error: contactProfileError, data: contactProfileData }
  ] = useLazyQuery(GET_CONTACT_PROFILE);

  const setTabBarVisibility = (state) => {
    navigation.setOptions({ tabBarVisible: state });
  };

  const getActiveUserProfile = (user) => {
    getContactProfile({ variables: { userId: user.id } });
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
            <UserContext.Provider value={{ authUserId, getActiveUserProfile }}>
              <UserListWrapper
                type="chat"
                loading={activeChatsLoading}
                data={activeChatsData && activeChatsData.getActiveUsers}
                navigation={props.navigation}
              />
            </UserContext.Provider>
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
              contactProfile={contactProfileData}
              loading={contactProfileLoading}
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
