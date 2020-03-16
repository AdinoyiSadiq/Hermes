import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ActiveChats from './userList/ActiveChats';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function Chats({ navigation }) {
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
      <Stack.Screen name="activeChats" component={ActiveChats} />
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
