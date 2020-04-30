import React, { useState } from 'react';
import {
  StyleSheet, Text, ScrollView, View, Dimensions
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SignupForm from '../../components/auth/SignupForm';

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
        <AuthHeader navigation={navigation} type="signup" />
        <View>
          <Text style={styles.titleText}>Join the Hermes way</Text>
        </View>
        <SignupForm navigation={navigation} />
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
  titleText: {
    fontSize: 24,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
    marginTop: '8%',
  },
});
