import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const MessageReceived = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.messageReceivedContainer}>
          <Text style={styles.messageText}>
            How about we think about this synergistically and not underwhelm expectations?
          </Text>
        </View>
        <View style={styles.messageDetailsContainer}>
          <Text style={styles.messageSentTime}>
            11:43AM
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
