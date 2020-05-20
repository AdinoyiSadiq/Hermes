import React from 'react';
import {
  StyleSheet, Image, Text, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import { timeFormatter } from '../../lib/dateFormatter';

const MessageSent = ({
  authUserId, messageDetails, setShowOptionsState,
}) => {
  const handleSetShowOptions = () => {
    const showOptionsStateDetails = { message: messageDetails };
    setShowOptionsState({ ...showOptionsStateDetails });
  };

  const renderMessageText = () => {
    if (messageDetails && ((messageDetails.image && messageDetails.text) || messageDetails.text)) {
      return (
        <View style={styles.messageSentContainer}>
          {
            (messageDetails.quote.length !== 0) && (
              <TouchableOpacity style={styles.messageToReply}>
                <Text style={[styles.messageToReplyText, styles.messageToReplyUser]}>
                  {(messageDetails.quote[0].sender.id === authUserId)
                    ? 'You'
                    : `${messageDetails.quote[0].sender.firstname} ${messageDetails.quote[0].sender.lastname}`}
                </Text>
                <Text style={styles.messageToReplyText}>
                  {messageDetails.quote[0].text}
                </Text>
              </TouchableOpacity>
            )
          }
          <Text style={styles.messageText}>
            {messageDetails && messageDetails.text}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  const renderMessageImage = () => {
    if (messageDetails.image) {
      return (
        <Image style={styles.messageImage} source={{ uri: messageDetails.image }} />
      );
    }

    return <View />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchContainer}
        onLongPress={handleSetShowOptions}
      >
        { renderMessageImage() }
        { renderMessageText() }
      </TouchableOpacity>
      <View style={styles.messageDetailsContainer}>
        <Text style={styles.messageSentTime}>
          {messageDetails && timeFormatter(messageDetails.createdAt)}
        </Text>
        <View style={styles.messageReadReceiptsContainer}>
          <Image style={styles.messageReadReceipt} source={require('../../assets/images/read-receipt-orange-icon.png')} />
          <Image source={require('../../assets/images/read-receipt-orange-icon.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginRight: 1,
    paddingTop: 16
  },
  touchContainer: {
    alignItems: 'flex-end'
  },
  messageSentContainer: {
    width: '65%',
    paddingTop: 5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 11,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: Colors.colorOrangeLight1,
  },
  messageText: {
    fontFamily: 'Muli',
    fontSize: 14,
    color: Colors.colorBlack
  },
  messageDetailsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  messageSentTime: {
    fontFamily: 'Muli',
    fontSize: 12,
    marginRight: 8,
    color: Colors.colorGreyDark
  },
  messageReadReceiptsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageReadReceipt: {
    marginRight: 3
  },
  messageToReply: {
    backgroundColor: Colors.colorWhite,
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 4,
    marginBottom: 4,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderWidth: 1,
    borderRightWidth: 4,
    borderColor: Colors.colorOrange
  },
  messageToReplyUser: {
    color: Colors.colorOrange,
  },
  messageToReplyText: {
    fontSize: 12,
    fontFamily: 'Muli',
    fontWeight: '700',
    color: Colors.colorBlack,
  },
  messageImage: {
    height: 140,
    width: 140,
    borderRadius: 18,
    borderBottomRightRadius: 3,
    marginBottom: 5,
  },
});

export default MessageSent;
