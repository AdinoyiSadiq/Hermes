import React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';
import UserImage from '../../components/profile/UserImage';
import formatText from '../../lib/formatText';

const MessagesListHeader = ({
  user, authUserId, navigateBack, navigateToContactProfile,
}) => {
  return (
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
          <Text style={styles.userProfileDetailsStatus}>Online</Text>
        </View>
      </TouchableOpacity>
    </View>
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
