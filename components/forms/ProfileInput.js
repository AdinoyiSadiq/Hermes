import React from 'react';
import {
  StyleSheet, Text, TextInput, View
} from 'react-native';
import Colors from '../../constants/Colors';

export default function ProfileInput({
  value, error, touched, handleChange, handleBlur, field, placeholder, label
}) {
  return (
    <>
      <View style={styles.profileInputContainer}>
        <Text style={styles.profileInputLabel}>{label}</Text>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          onBlur={() => handleBlur(field)}
          style={styles.profileInput}
          placeholderStyle={styles.profileInputPlaceholder}
          placeholderTextColor={Colors.colorGreyDark}
        />
      </View>
      {
        error && touched && <Text style={styles.authError}>{error}</Text>
      }
    </>
  );
}

const styles = StyleSheet.create({
  profileInputContainer: {
    width: '70%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.colorGreyLight,
  },
  profileInputLabel: {
    fontFamily: 'Muli',
    fontSize: 12,
    color: Colors.colorGreyDark,
    marginTop: '7%',
  },
  profileInput: {
    fontSize: 15,
    fontFamily: 'Muli',
    marginTop: '5%',
    paddingBottom: '5%',
    textAlign: 'center',
  },
  profileInputPlaceholder: {
    fontFamily: 'Muli',
  },
  authError: {
    color: Colors.colorRed,
    fontSize: 11,
    fontFamily: 'Muli',
  }
});
