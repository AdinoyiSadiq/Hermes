import * as React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import AuthInput from '../../components/forms/AuthInput';
import Button from '../../components/buttons/Button';

export default function Signin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Hermes</Text>
        <View style={styles.logoSubTextContainer}>
          <Text style={styles.logoSubText}>You new here?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('signup'); }}>
            <Text style={styles.authLinkText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.titleText}>Sign in to Hermes</Text>
      </View>
      <View style={styles.authInputFormContainer}>
        <AuthInput placeholder="Email Address" />
        <AuthInput placeholder="Password" />
        <View style={styles.authButtonContainer}>
          <Button>Sign In</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
  titleText: {
    fontSize: 24,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
    marginTop: '8%',
  },
  authInputFormContainer: {
    width: '85%',
  },
  authButtonContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
});
