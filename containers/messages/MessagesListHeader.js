import React, { useState } from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity, Dimensions
} from 'react-native';
import { useSubscription } from '@apollo/react-hooks';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import UserImage from '../../components/profile/UserImage';
import formatText from '../../lib/formatText';

import TYPING_SUBSCRIPTION from '../../subscriptions/typingSubscription';

const MessagesListHeader = ({
  user, authUserId, navigateBack, navigateToContactProfile, uploadingImage
}) => {
  const [isTyping, setIsTyping] = useState({ state: false, user: false });

  useSubscription(
    TYPING_SUBSCRIPTION,
    {
      variables: { senderId: user.id, receiverId: authUserId },
      onSubscriptionData: (res) => {
        if (res.subscriptionData.data) {
          setTypingState();
        }
      }
    }
  );

  const setTypingState = () => {
    setIsTyping({ state: true, user: user.id });
    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backNavButton}
          onPress={() => navigateBack()}
        >
          <Image
            source={require('../../assets/images/back-button-icon.png')}
            style={styles.userImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userProfileDetailsContainer}
          onPress={() => navigateToContactProfile()}
        >
          <UserImage user={user} size="small" />
          <View style={styles.userProfileDetails}>
            <Text style={styles.userProfileDetailsName}>
              {`${formatText(user.firstname)} ${formatText(user.lastname)}`}
            </Text>
            <Text style={styles.userProfileDetailsStatus}>
              {(isTyping.state && isTyping.user === user.id) ? 'typing...' : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {(uploadingImage.state && uploadingImage.receiverId === user.id) && (
        <Progress.Bar
          indeterminate
          height={1.5}
          width={Dimensions.get('window').width}
          borderRadius={0}
          borderWidth={0}
          color={Colors.colorOrange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.colorGreyLight,
    borderBottomWidth: 1,
  },
  backNavButton: {
    marginRight: 16,
  },
  userProfileDetailsContainer: {
    flexDirection: 'row'
  },
  userProfileDetailsName: {
    fontSize: 16,
    fontFamily: 'Muli-Bold',
    fontWeight: '600'
  },
  userProfileDetailsStatus: {
    fontSize: 12,
    fontFamily: 'Muli',
    color: Colors.colorGreyDark,
  }
});

export default MessagesListHeader;
