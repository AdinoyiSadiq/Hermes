import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import { timeFormatter } from '../../lib/dateFormatter';

const MessageReceived = ({ messageDetails }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.messageReceivedContainer}>
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
});

export default MessageReceived;
