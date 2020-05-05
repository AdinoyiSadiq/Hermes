import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/react-hooks';

import UserListWrapper from './userList/UserListWrapper';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';
import Loader from '../components/loaders/Loader';

import GET_ALL_CONTACTS from '../queries/getAllContacts';

const Stack = createStackNavigator();

export default function Contacts({ navigation, loading, authUserId }) {
  const {
    loading: contactsLoading, error: contactsError, data: contactsData
  } = useQuery(GET_ALL_CONTACTS);

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
      <Stack.Screen name="contactList">
        {(props) => {
          return (
            <UserListWrapper
              type="contact"
              loading={contactsLoading}
              data={contactsData && contactsData.getAllContacts}
              navigation={props.navigation}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="messages">
        {(props) => {
          return (
            <Messages
              setTabBarVisibility={setTabBarVisibility}
              navigation={props.navigation}
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
