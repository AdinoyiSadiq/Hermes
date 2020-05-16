import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import { timeFormatter } from '../../lib/dateFormatter';

const MessageReceived = ({
  authUserId, messageDetails, setShowOptionsState
}) => {
  const handleSetShowOptions = () => {
    const showOptionsStateDetails = { message: messageDetails };
    setShowOptionsState({ ...showOptionsStateDetails });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={handleSetShowOptions}
      >
        <View style={styles.messageReceivedContainer}>
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
      </TouchableOpacity>

      <View style={styles.messageDetailsContainer}>
        <Text style={styles.messageSentTime}>
          {messageDetails && timeFormatter(messageDetails.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginLeft: 1,
    paddingTop: 16
  },
  messageReceivedContainer: {
    width: '65%',
    paddingTop: 5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 11,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: Colors.colorWhite,
    borderWidth: 1,
    borderColor: Colors.colorGreyLight,
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
    color: Colors.colorGreyDark
  },
  messageToReply: {
    backgroundColor: Colors.colorOrangeLight1,
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 4,
    marginBottom: 4,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 4,
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
  }
});

export default MessageReceived;
