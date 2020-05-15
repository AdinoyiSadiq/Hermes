import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { StyleSheet, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import MessagesListHeader from '../containers/messages/MessagesListHeader';
import MessageInput from '../containers/messages/MessageInput';
import MessageList from '../containers/messages/MessageList';
import MessageOptions from '../containers/messages/MessageOptions';
import GET_MESSAGES from '../queries/getMessages';

export default function Messages({ navigation, route, setTabBarVisibility }) {
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const { navigate, goBack } = navigation;
  const { user, authUserId } = route.params;

  const {
    loading: messagesLoading,
    error: messagesError,
    data: messagesData,
    fetchMore
  } = useQuery(GET_MESSAGES, {
    variables: { receiverId: user.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

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

  const fetchMoreMessages = (limit) => {
    fetchMore({
      variables: {
        receiverId: user.id,
        cursor: messagesData.getMessages[messagesData.getMessages.length - 1].createdAt,
        limit: limit || 15,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.getMessages.length < (limit || 15)) {
          setHasMoreMessages(false);
        }
        const updatedMessages = [...prev.getMessages, ...fetchMoreResult.getMessages];
        return {
          ...prev,
          getMessages: updatedMessages
        };
      }
    });
  };

  const getMoreMessages = () => {
    if (!messagesLoading && hasMoreMessages) {
      if (messagesData && messagesData.getMessages) {
        fetchMoreMessages();
      }
    }
  };

  const setShowOptionsState = ({ messageId, reverse }) => {
    setShowOptions({ state: !showOptions.state, messageId, reverse });
  };

  return (
    <>
      <View style={styles.container}>
        <MessageOptions
          showOptions={showOptions}
          setShowOptionsState={setShowOptionsState}
          fetchMoreMessages={fetchMoreMessages}
        />
        <MessagesListHeader
          user={user}
          authUserId={authUserId}
          navigateBack={navigateBack}
          navigateToContactProfile={navigateToContactProfile}
        />
        <MessageList
          authUserId={authUserId}
          messages={messagesData && messagesData.getMessages}
          loading={messagesLoading}
          showOptions={showOptions}
          getMoreMessages={getMoreMessages}
          setShowOptionsState={setShowOptionsState}
        />
        <MessageInput
          user={user}
          authUserId={authUserId}
        />
      </View>
    </>
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
