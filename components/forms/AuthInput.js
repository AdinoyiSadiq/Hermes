import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Colors from '../../constants/Colors';

const AuthInput = ({ placeholder }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={styles.authInput}
        placeholderStyle={styles.authInputPlaceholder}
        placeholderTextColor={Colors.colorGreyDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  authInput: {
    height: 48,
    backgroundColor: Colors.colorOrangeLight,
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 16,
  },
  authInputPlaceholder: {
    fontFamily: 'Muli',
  },
});

export default AuthInput;
