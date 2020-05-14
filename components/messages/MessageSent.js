import React from 'react';
import {
  StyleSheet, Image, Text, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import { timeFormatter } from '../../lib/dateFormatter';

const MessageSent = ({ messageDetails }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.messageSentContainer}>
          <Text style={styles.messageText}>
            {messageDetails && messageDetails.text}
          </Text>
        </View>
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
  }
});

export default MessageSent;
