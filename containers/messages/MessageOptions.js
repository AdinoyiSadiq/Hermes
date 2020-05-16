/* eslint-disable no-shadow */
import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-native-modal';
import Button from '../../components/buttons/Button';
import Colors from '../../constants/Colors';
import DELETE_MESSAGE from '../../mutations/deleteMessage';
import GET_MESSAGES from '../../queries/getMessages';

export default function MessagesOptions({
  authUserId, showOptions, setShowOptionsState, fetchMoreMessages, handleMessageToReply
}) {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const { message } = showOptions;
  const messageId = message && message.id;

  const authUserMessage = (message && message.sender && message.sender.id) === authUserId;

  const handleDeleteMessage = () => {
    deleteMessage({
      variables: { messageId },
      update: (cache, { data: { deleteMessage } }) => {
        const data = cache.readQuery({
          query: GET_MESSAGES,
          variables: { receiverId: deleteMessage.receiver.id },
        });

        cache.writeQuery({
          query: GET_MESSAGES,
          variables: { receiverId: deleteMessage.receiver.id },
          data: {
            getMessages: data.getMessages.filter((message) => message.id !== messageId),
          }
        });
        fetchMoreMessages(3);
      }
    });
    setShowOptionsState(false);
  };

  const handleReplyMessage = () => {
    handleMessageToReply(message);
    setShowOptionsState(false);
  };

  return (
    <Modal
      isVisible={showOptions.state || false}
      onBackdropPress={() => setShowOptionsState(false)}
      onSwipeComplete={() => setShowOptionsState(false)}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.optionsContainer}>
        <View style={styles.optionsHandleContainer}>
          <View style={styles.optionsHandle} />
        </View>
        <View style={styles.optionsDetails}>
          {
            authUserMessage && (
              <TouchableOpacity
                style={styles.messageOption}
                onPress={handleDeleteMessage}
              >
                <Image
                  source={require('../../assets/images/delete-button-icon.png')}
                  style={styles.messageOptionIcon}
                />
                <Text style={styles.messageOptionText}>Delete Message</Text>
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            style={styles.messageOption}
            onPress={handleReplyMessage}
          >
            <Image
              source={require('../../assets/images/reply-button-icon.png')}
              style={styles.messageOptionIcon}
            />
            <Text style={styles.messageOptionText}>Reply Message</Text>
          </TouchableOpacity>
          <Button
            handlePress={() => setShowOptionsState(false)}
            text="Cancel"
            size="full"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  optionsContainer: {
    backgroundColor: Colors.colorWhite,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
  optionsHandleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  optionsHandle: {
    width: 32,
    height: 6,
    borderRadius: 20,
    backgroundColor: Colors.colorGreyLigth2
  },
  optionsDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20
  },
  messageOption: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  messageOptionText: {
    fontSize: 16,
    fontFamily: 'Muli',
    color: Colors.colorBlack,
  },
  messageOptionIcon: {
    marginRight: 12
  }
});
