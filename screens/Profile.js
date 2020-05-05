import React from 'react';
import {
  StyleSheet, ScrollView, Text, TextInput, Image, View
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import ProfileHeader from '../containers/profile/ProfileHeader';
import Button from '../components/buttons/Button';
import Colors from '../constants/Colors';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileHeader title="Your Profile" />
      </View>
      <ScrollView
        style={{ backgroundColor: 'white' }}
      >
        <View style={styles.profileFormContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImagePlaceholderText}>PB</Text>
            <Image style={styles.imageSelectorIcon} source={require('../assets/images/image-selector-icon.png')} />
          </View>
          <View style={styles.profileInputContainer}>
            <Text style={styles.profileInputLabel}>First Name</Text>
            <TextInput
              placeholder="Enter Your First Name"
              style={styles.profileInput}
              placeholderStyle={styles.profileInputPlaceholder}
              placeholderTextColor={Colors.colorGreyDark}
            />
          </View>
          <View style={styles.profileInputContainer}>
            <Text style={styles.profileInputLabel}>Last Name</Text>
            <TextInput
              placeholder="Enter Your Last Name"
              style={styles.profileInput}
              placeholderStyle={styles.profileInputPlaceholder}
              placeholderTextColor={Colors.colorGreyDark}
            />
          </View>
          <View style={styles.profileInputContainer}>
            <Text style={styles.profileInputLabel}>Username</Text>
            <TextInput
              placeholder="Enter Your Username"
              style={styles.profileInput}
              placeholderStyle={styles.profileInputPlaceholder}
              placeholderTextColor={Colors.colorGreyDark}
            />
          </View>
          <View style={styles.profileInputContainer}>
            <Text style={styles.profileInputLabel}>Email Address</Text>
            <TextInput
              placeholder="Enter Your Email Address"
              style={styles.profileInput}
              placeholderStyle={styles.profileInputPlaceholder}
              placeholderTextColor={Colors.colorGreyDark}
            />
          </View>
          <View style={styles.profileInputContainer}>
            <Text style={styles.profileInputLabel}>Location</Text>
            <TextInput
              placeholder="Enter Your Location"
              style={styles.profileInput}
              placeholderStyle={styles.profileInputPlaceholder}
              placeholderTextColor={Colors.colorGreyDark}
            />
          </View>
          <View style={styles.profileButtonContainer}>
            <Button>
              Update Profile
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },
  profileContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    })
  },
  profileFormContainer: {
    paddingTop: '5%',
    alignItems: 'center'
  },
  profileImagePlaceholder: {
    position: 'relative',
    height: 140,
    width: 140,
    borderRadius: 300,
    backgroundColor: Colors.colorOrangeLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontFamily: 'Muli',
    fontSize: 60,
    color: Colors.colorWhite
  },
  imageSelectorIcon: {
    position: 'absolute',
  },
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
  profileButtonContainer: {
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
});
