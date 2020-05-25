import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import {
  StyleSheet, View, Text, TextInput, SafeAreaView, FlatList
} from 'react-native';
import MessageSent from '../../components/messages/MessageSent';
import MessageReceived from '../../components/messages/MessageReceived';
import Loader from '../../components/loaders/Loader';
import checkDateDifference from '../../lib/checkDateDifference';
import dateFormatter from '../../lib/dateFormatter';
import Colors from '../../constants/Colors';

const MessageList = ({
  authUserId,
  messages,
  loading,
  getMoreMessages,
  showOptions,
  setShowOptionsState,
  subscribeToNewMessages,
  subscribeToUpdatedMessages,
  subscribeToDeletedMessages
}) => {
  const messageDateComponentRef = useRef();
  const messageDateRef = useRef();
  const scrollOffsetRef = useRef(0);
  const scrollDirectionRef = useRef();


  useEffect(() => {
    subscribeToNewMessages();
    subscribeToDeletedMessages();
    subscribeToUpdatedMessages();
  }, []);

  const handleEndReached = () => {
    getMoreMessages();
  };

  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (changed) {
      const message = viewableItems.sort((a, b) => a.item.createdAt - b.item.createdAt)[0];
      const updatedMessageDate = {
        rawDate: parseInt(message.item.createdAt, 10),
        formattedDate: dateFormatter(parseInt(message.item.createdAt, 10), 'messages')
      };
      if (!messageDateRef.current) {
        messageDateRef.current = updatedMessageDate;
        messageDateComponentRef
          .current.setNativeProps({ text: updatedMessageDate.formattedDate });
      } else if (scrollDirectionRef.current === 'down') {
        if (messageDateRef.current.rawDate > updatedMessageDate.rawDate) {
          messageDateRef.current = updatedMessageDate;
          messageDateComponentRef
            .current.setNativeProps({ text: updatedMessageDate.formattedDate });
        }
      } else if (scrollDirectionRef.current === 'up') {
        if (messageDateRef.current.rawDate < updatedMessageDate.rawDate) {
          messageDateRef.current = updatedMessageDate;
          messageDateComponentRef
            .current.setNativeProps({ text: updatedMessageDate.formattedDate });
        }
      }
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 0 });

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > scrollOffsetRef.current ? 'down' : 'up';
    scrollOffsetRef.current = currentOffset;
    scrollDirectionRef.current = direction;
  };

  const renderMessage = (message) => {
    if ((message && message.sender && message.sender.id) === authUserId) {
      return (
        <View
          key={message.id}
          id={message.createdAt}
        >
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
          showOptions={showOptions}
          setShowOptionsState={setShowOptionsState}
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
      {messageDateRef.current && (
        <View style={styles.messageListDateContainer}>
          <View style={styles.messageDateContainer}>
            <TextInput
              style={styles.messageDate}
              ref={messageDateComponentRef}
              editable={false}
            />
          </View>
        </View>
      )}

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
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            onEndReachedThreshold={0}
            inverted
            onScroll={onScroll}
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
    position: 'relative'
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
    backgroundColor: Colors.colorGreyLight,
  },
  messageDate: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 12,
  },
  messageListDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    top: '12.5%',
    transform: [{ translateX: -45 }],
    zIndex: 1000000,
  }
});

export default MessageList;
