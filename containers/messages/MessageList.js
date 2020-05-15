import React from 'react';
import moment from 'moment';
import {
  StyleSheet, View, Text, SafeAreaView, FlatList
} from 'react-native';
import MessageSent from '../../components/messages/MessageSent';
import MessageReceived from '../../components/messages/MessageReceived';
import Loader from '../../components/loaders/Loader';
import checkDateDifference from '../../lib/checkDateDifference';
import dateFormatter from '../../lib/dateFormatter';
import Colors from '../../constants/Colors';

const MessageList = ({
  authUserId, messages, loading, getMoreMessages, showOptions, setShowOptionsState
}) => {
  const handleEndReached = () => {
    getMoreMessages();
  };

  const renderMessage = (message) => {
    if ((message && message.sender && message.sender.id) === authUserId) {
      return (
        <View key={message.id} id={message.createdAt}>
          {
            message.showDate && (
              <View style={styles.messageDateContainer}>
                <Text style={styles.messageDate}>{dateFormatter(message.createdAt, 'messages')}</Text>
              </View>
            )
          }
          <MessageSent
            authUserId={authUserId}
            messageDetails={message}
            showOptions={showOptions}
            setShowOptionsState={setShowOptionsState}
          />
        </View>
      );
    }
    return (
      <View key={message.id} id={message.createdAt}>
        {
          message.showDate && (
            <View style={styles.messageDateContainer}>
              <Text style={styles.messageDate}>{dateFormatter(message.createdAt, 'messages')}</Text>
            </View>
          )
        }
        <MessageReceived
          authUserId={authUserId}
          messageDetails={message}
        />
      </View>
    );
  };

  const renderMessageList = (userMessages) => {
    const messageDate = { dataString: moment().format('YYYY-MM-DD HH:mm:ss') };
    const messageList = [...userMessages].reverse().map((message) => {
      const showDate = checkDateDifference(messageDate.dataString, message.createdAt);
      if (showDate) { messageDate.dataString = message.createdAt; }
      const updatedMessage = message;
      updatedMessage.showDate = showDate;
      return updatedMessage;
    });
    return messageList.reverse();
  };

  return (
    <>
      {(loading) && (
        <View>
          <Loader color="orange" />
        </View>
      )}
      {(authUserId && messages) && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={renderMessageList(messages)}
            renderItem={({ item }) => renderMessage(item)}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0}
            inverted
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  messagesContainer: {
    justifyContent: 'flex-end',
  },
  messageDateContainer: {
    height: 25,
    width: 90,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 3,
    backgroundColor: Colors.colorGreyLight
  },
  messageDate: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 12,

  },
});

export default MessageList;
