import * as React from 'react';
import {
  StyleSheet, Text, View, TouchableWithoutFeedback
} from 'react-native';
import UserImage from '../../components/profile/UserImage';
import formatText from '../../lib/formatText';
import dateFormatter from '../../lib/dateFormatter';
import Colors from '../../constants/Colors';
import AuthUserContext from '../../context/AuthUser';

// Note: ensure that it can handle long names and messages
const UserItem = ({
  item: {
    user, status, actionUserId, contact, profileImage, lastMessage, unreadMessages
  },
  type,
  navigation
}) => {
  return (
    <AuthUserContext.Consumer>
      {({ authUserId }) => (
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('messages', {
            user: { ...user, profileImage },
            authUserId,
          });
        }}
        >
          <View style={styles.userItemContainer}>
            <UserImage user={{ ...user, profileImage }} />
            { (type === 'chat') ? (
              <View style={styles.userDetailsContainer}>
                <View style={[styles.userDetails, styles.userName]}>
                  <Text style={styles.userNameText}>{`${formatText(user.firstname)} ${formatText(user.lastname)}`}</Text>
                  {unreadMessages ? (
                    <View style={styles.messageNumberContainer}>
                      <Text style={styles.messageNumber}>{`${unreadMessages}`}</Text>
                    </View>
                  ) : <View />}
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.messageText}>
                    {(lastMessage && lastMessage.text) && `${(lastMessage.text).slice(0, 22)}${(lastMessage.text.length > 22) ? '...' : ''}`}
                  </Text>
                  <Text style={styles.messageTime}>
                    {dateFormatter(lastMessage.createdAt)}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.userDetailsContainer}>
                <View style={[styles.userDetails, styles.userName]}>
                  <Text style={styles.userNameText}>{`${formatText(user.firstname)} ${formatText(user.lastname)}`}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={[styles.messageText, styles.contactDetailsText]}>
                    {`Last seen: ${dateFormatter(user.lastseen)}`}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </AuthUserContext.Consumer>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12
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
    marginBottom: 4
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
