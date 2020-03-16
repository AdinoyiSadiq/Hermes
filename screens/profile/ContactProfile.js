import * as React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Colors from '../../constants/Colors';

const ContactProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../assets/images/back-button-white-icon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageTextContainer}>
            <Text style={styles.profileImageText}>PB</Text>
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileNameText}>Priscilla Black</Text>
          </View>
        </View>
        <View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>@priscillablack</Text>
            <Text style={styles.profileDetailLabel}>Username</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>priscillablack@gmail.com</Text>
            <Text style={styles.profileDetailLabel}>Email Address</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>Kaduna</Text>
            <Text style={styles.profileDetailLabel}>Location</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    }),
  },
  profileHeaderContainer: {
    position: 'relative'
  },
  profileHeader: {
    position: 'absolute',
    padding: 16,
    zIndex: 100,
  },
  profileImageContainer: {
    height: 375,
    backgroundColor: Colors.colorOrangeLight1,
    flexDirection: 'column',
  },
  profileImageTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  profileImageText: {
    color: Colors.colorWhite,
    fontFamily: 'Muli',
    fontSize: 65,
  },
  profileNameContainer: {
    height: 48,
    width: '100%',
    paddingLeft: 24,
    paddingTop: 4,
    backgroundColor: Colors.colorGreyLigth1
  },
  profileNameText: {
    fontFamily: 'Muli-Bold',
    fontSize: 24,
    fontWeight: '800',
    color: Colors.colorWhite,
  },
  profileDetails: {
    borderBottomColor: Colors.colorGreyLight,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingTop: 15,
    paddingBottom: 15
  },
  profileDetailValue: {
    fontFamily: 'Muli-Bold',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileDetailLabel: {
    fontFamily: 'Muli',
    fontSize: 14,
    color: Colors.colorGreyDark
  },
  backButton: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.colorGreyLigth1,
    borderColor: Colors.colorGreyDark,
    borderWidth: 0.1,
  }
});

export default ContactProfile;
