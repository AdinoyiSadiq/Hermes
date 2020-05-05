import React from 'react';
import {
  StyleSheet, Text, Image, View
} from 'react-native';
import Colors from '../../constants/Colors';

const UserImage = ({ user, size }) => {
  return user.profileImage ? (
    <View>
      <Image
        source={{ uri: user.profileImage }}
        style={styles.userImage}
      />
    </View>
  ) : (
    <View style={styles.userImagePlaceholder}>
      <Text style={styles.userImagePlaceholderText}>
        {`${user.firstname && user.firstname.charAt(0).toUpperCase()}${user.lastname && user.lastname.charAt(0).toUpperCase()}`}
      </Text>
    </View>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  userImagePlaceholder: {
    height: 60,
    width: 60,
    borderRadius: 300,
    backgroundColor: Colors.colorOrangeLight1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImagePlaceholderText: {
    fontFamily: 'Muli',
    fontSize: 15,
    fontWeight: '900',
    color: Colors.colorWhite
  },
});
