/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const MessageInputModifier = ({
  messageToReply, handleMessageToReply, image, clearImage
}) => {
  const resetInputModifier = () => {
    clearImage();
    handleMessageToReply(false);
  };

  return (
    messageToReply ? (
      <View style={styles.container}>
        <View style={styles.messageReplyContainer}>
          <View>
            <View style={styles.messageReplyHeader}>
              <Image source={require('../../assets/images/message-reply-icon.png')} />
              <Text style={styles.messageReplyUserName}>
                {
                  messageToReply
                  && messageToReply.sender
                  && `${messageToReply.sender.firstname} ${messageToReply.sender.lastname}`
                }
              </Text>
            </View>
            <Text style={styles.messageReplyText}>{(messageToReply.text) && `${(messageToReply.text).slice(0, 22)}...`}</Text>
          </View>
          <TouchableOpacity
            style={styles.messageModifierCloseContainer}
            onPress={resetInputModifier}
          >
            <Image source={require('../../assets/images/close-button-icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    ) : image ? (
      <View style={styles.container}>
        <View style={styles.messageReplyContainer}>
          <Image style={styles.imagePreview} source={{ uri: image }} />
          <TouchableOpacity
            style={styles.messageModifierCloseContainer}
            onPress={resetInputModifier}
          >
            <Image source={require('../../assets/images/close-button-icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    ) : <View />
  );
};

export default MessageInputModifier;

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.colorGreyLight,
    borderTopWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  messageReplyContainer: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageReplyHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  messageReplyUserName: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Muli-Bold',
    fontWeight: '700'
  },
  messageReplyText: {
    fontWeight: '600',
    fontFamily: 'Muli',
    color: Colors.colorGreyDark
  },
  messageModifierCloseContainer: {
    height: 28,
    width: 28,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colorOrangeLight1,
  },
  imagePreview: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
});
