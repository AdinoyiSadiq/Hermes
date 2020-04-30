import * as React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SigninForm from '../../components/auth/SigninForm';

export default function Signin({ navigation }) {
  return (
    <View style={styles.container}>
      <AuthHeader navigation={navigation} type="signin" />
      <View>
        <Text style={styles.titleText}>Sign in to Hermes</Text>
      </View>
      <SigninForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
    marginTop: '8%',
  },
});
