/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'chats';

const TabBarIcon = ({ focused, name }) => {
  const icon = (name === 'chats') ? require('../assets/images/chats-icon.png')
    : (name === 'contacts') ? require('../assets/images/contacts-icon.png')
      : require('../assets/images/profile-icon.png');
  const activeIcon = (name === 'chats') ? require('../assets/images/chats-active-icon.png')
    : (name === 'contacts') ? require('../assets/images/contacts-active-icon.png')
      : require('../assets/images/profile-active-icon.png');
  return (
    <Image source={focused ? activeIcon : icon} style={styles.tabIcon} />
  );
};

export default function Home() {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.colorOrange,
        inactiveTintColor: Colors.colorGreyDark,
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Muli',
        }
      }}
    >
      <BottomTab.Screen
        name="Chats"
        component={Chats}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chats" />,
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          title: 'Contacts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="contacts" />
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="profile" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    marginTop: 5,
  }
});
