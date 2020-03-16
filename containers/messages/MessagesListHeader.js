import React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const MessagesListHeader = ({ navigateBack, navigateToContactProfile }) => {
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
        <View style={styles.userProfileImagePlaceholder}>
          <Text style={styles.userProfileImagePlaceholderText}>PB</Text>
        </View>
        <View style={styles.userProfileDetails}>
          <Text style={styles.userProfileDetailsName}>Priscilla Black</Text>
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
  userProfileImagePlaceholder: {
    height: 32,
    width: 32,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: Colors.colorOrangeLight1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfileDetailsContainer: {
    flexDirection: 'row'
  },
  userProfileImagePlaceholderText: {
    color: Colors.colorWhite,
    fontFamily: 'Muli',
    fontSize: 14,
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
