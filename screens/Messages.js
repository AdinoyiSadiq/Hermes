import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import MessagesListHeader from '../containers/messages/MessagesListHeader';
import MessageInput from '../containers/messages/MessageInput';
import MessageList from '../containers/messages/MessageList';

export default function Messages({ navigation, setTabBarVisibility }) {
  const { navigate, goBack } = navigation;
  useEffect(() => {
    setTabBarVisibility(false);
    return () => {
      setTabBarVisibility(true);
    };
  }, []);

  const navigateBack = async () => {
    await setTabBarVisibility(true);
    goBack();
  };

  const navigateToContactProfile = () => {
    navigate('contactProfile');
  };

  return (
    <View style={styles.container}>
      <MessagesListHeader
        navigateBack={navigateBack}
        navigateToContactProfile={navigateToContactProfile}
      />
      <MessageList />
      <MessageInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    }),
    justifyContent: 'space-between',
  },
});
