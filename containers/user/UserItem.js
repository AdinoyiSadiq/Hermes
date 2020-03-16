import * as React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableWithoutFeedback
} from 'react-native';

import Colors from '../../constants/Colors';

// Note: ensure that it can handle long names and messages
const UserItem = ({ type, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => { navigation.navigate('messages'); }}>
      <View style={styles.userItemContainer}>
        <View>
          <Image
            source={require('../../assets/images/avatar-icon.png')}
            style={styles.userImage}
          />
        </View>
        { (type === 'chat') ? (
          <View style={styles.userDetailsContainer}>
            <View style={[styles.userDetails, styles.userName]}>
              <Text style={styles.userNameText}>Priscilla Black</Text>
              <View style={styles.messageNumberContainer}>
                <Text style={styles.messageNumber}>112</Text>
              </View>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.messageText}>This was meant to be the last...</Text>
              <Text style={styles.messageTime}>12:03PM</Text>
            </View>
          </View>
        ) : (
          <View style={styles.userDetailsContainer}>
            <View style={[styles.userDetails, styles.userName]}>
              <Text style={styles.userNameText}>Priscilla Black</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.messageText, styles.contactDetailsText]}>
                Last contacted: 5 days ago
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  userDetailsContainer: {
    flex: 1,
    marginLeft: '3%',
    paddingBottom: 16,
    justifyContent: 'center',
    borderBottomColor: Colors.colorGreyLight,
    borderBottomWidth: 1,
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactDetailsText: {
    color: Colors.colorGreyDark,
  },
  userName: {
    marginBottom: 8,
  },
  userNameText: {
    fontSize: 16,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
  },
  messageNumberContainer: {
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.colorOrange,
  },
  messageNumber: {
    color: Colors.colorWhite,
    fontSize: 12,
    fontWeight: '600'
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Muli',
    color: Colors.colorBlack,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Muli',
    color: Colors.colorBlack,
    alignSelf: 'flex-end'
  }
});

export default UserItem;
