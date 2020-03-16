import React, { useState } from 'react';
import {
  StyleSheet, Text, ScrollView, View, TouchableOpacity, Dimensions
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import AuthInput from '../../components/forms/AuthInput';
import Button from '../../components/buttons/Button';

const { height } = Dimensions.get('window');

export default function Signup({ navigation }) {
  const [screenHeight, setScreenHeight] = useState(0);

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > height;
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      onContentSizeChange={onContentSizeChange}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Hermes</Text>
          <View style={styles.logoSubTextContainer}>
            <Text style={styles.logoSubText}>Have an account already?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('signin'); }}>
              <Text style={styles.authLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Join the Hermes way</Text>
        </View>
        <View style={styles.authInputFormContainer}>
          <AuthInput placeholder="First name" />
          <AuthInput placeholder="Last name" />
          <AuthInput placeholder="Username" />
          <AuthInput placeholder="Location" />
          <AuthInput placeholder="Email Address" />
          <AuthInput placeholder="Password" />
          <AuthInput placeholder="Confirm Password" />

          <View style={styles.authButtonContainer}>
            <Button
              navigation={navigation}
            >
              Create Account
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
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
