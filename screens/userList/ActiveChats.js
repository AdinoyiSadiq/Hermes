/* eslint-disable global-require */
import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import UserItem from '../../containers/user/UserItem';
import UserListHeader from '../../containers/user/UserHeader';

export default function ActiveChats({ navigation }) {
  return (
    <View style={styles.container}>
      <UserListHeader title="Active Chats" />
      <ScrollView style={styles.userItemListContainer}>
        <UserItem type="chat" navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    })
  },
  userItemListContainer: {
    paddingTop: '5%'
  },
});
