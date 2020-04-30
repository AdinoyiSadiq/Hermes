import * as React from 'react';
import {
  StyleSheet, TextInput, View, Text,
} from 'react-native';

import Colors from '../../constants/Colors';

const AuthInput = ({
  field, value, handleChange, handleBlur, placeholder, error, touched, type
}) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={(text) => handleChange(text, field)}
        onBlur={() => handleBlur(field)}
        placeholder={placeholder}
        style={styles.authInput}
        placeholderStyle={styles.authInputPlaceholder}
        placeholderTextColor={Colors.colorGreyDark}
        secureTextEntry={type === 'password'}
      />
      {
        error && touched && <Text style={styles.authError}>{error}</Text>
      }
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
  authError: {
    color: Colors.colorRed,
    fontSize: 11,
    fontFamily: 'Muli',
    marginLeft: 20,
    paddingTop: 5,
  }
});

export default AuthInput;
