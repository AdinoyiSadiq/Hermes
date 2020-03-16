import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MessageSent from '../../components/messages/MessageSent';
import MessageReceived from '../../components/messages/MessageReceived';

const MessageList = () => {
  return (
    <ScrollView>
      <View style={styles.messageList}>
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'flex-end',
  }
});

export default MessageList;
