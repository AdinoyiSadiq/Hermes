import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContactList from './userList/ContactList';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function Contacts({ navigation }) {
  const setTabBarVisibility = (state) => {
    navigation.setOptions({ tabBarVisible: state });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.colorWhite },
      }}
    >
      <Stack.Screen name="contactList" component={ContactList} />
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
