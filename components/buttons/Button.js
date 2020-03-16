import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';

const Button = ({ children, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.authButton}
      onPress={() => navigation.navigate('home')}
    >
      <Text style={styles.authButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authButton: {
    height: 56,
    width: 187,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.colorOrange,
  },
  authButtonText: {
    color: Colors.colorWhite,
    fontSize: 14,
    fontFamily: 'Muli-Bold',
    fontWeight: '900',
  },
});

export default Button;
