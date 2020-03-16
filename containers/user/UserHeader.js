import * as React from 'react';
import {
  StyleSheet, Text, Image, View
} from 'react-native';

const UserHeader = ({ title }) => {
  const icon = (title === 'Your Profile')
    ? require('../../assets/images/profile-settings-icon.png')
    : require('../../assets/images/search-icon.png');
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <Image source={icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
  },
  hide: {
    display: 'none',
  }
});

export default UserHeader;
