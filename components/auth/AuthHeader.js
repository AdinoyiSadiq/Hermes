import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const AuthHeader = ({ navigation, type }) => {
  const navRoute = type === 'signup' ? 'signin' : 'signup';
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Hermes</Text>
      <View style={styles.logoSubTextContainer}>
        <Text style={styles.logoSubText}>
          {type === 'signup' ? 'Have an account already?' : 'You new here?'}
        </Text>
        <TouchableOpacity onPress={() => { navigation.navigate(navRoute); }}>
          <Text style={styles.authLinkText}>
            {type === 'signup' ? 'Sign In' : 'Create an account'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Muli',
    ...ifIphoneX({
      marginTop: '16%',
    }, {
      marginTop: '8%',
    })
  },
  logoSubTextContainer: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  logoSubText: {
    fontSize: 14,
    fontFamily: 'Muli',
    paddingRight: 5,
  },
  authLinkText: {
    fontSize: 14,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
  },
});
