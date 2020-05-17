import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Colors from '../../constants/Colors';
import Loader from '../../components/loaders/Loader';
import formatText from '../../lib/formatText';


const ContactProfile = ({
  contactProfile, loading, navigation
}) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader color="orange" />
      </View>
    );
  }

  const renderProfileText = () => {
    return (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileNameText}>
          {`${formatText(contactProfile.getProfile.firstname)} ${formatText(contactProfile.getProfile.lastname)}`}
        </Text>
      </View>
    );
  };

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
        {
          contactProfile.getProfile.profileImage ? (
            <ImageBackground
              style={styles.profileImageContainer}
              source={{ uri: contactProfile.getProfile.profileImage }}
            >
              <View style={styles.profileImageTextContainer} />
              {renderProfileText()}
            </ImageBackground>
          ) : (
            <View style={styles.profileImageContainer} source={require('../../assets/images/back-button-white-icon.png')}>
              <View style={styles.profileImageTextContainer}>
                <Text style={styles.profileImageText}>
                  {`${contactProfile.getProfile.firstname.charAt(0).toUpperCase()}${contactProfile.getProfile.lastname.charAt(0).toUpperCase()}`}
                </Text>
              </View>
              {renderProfileText()}
            </View>
          )
        }
        <View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>{`@${contactProfile.getProfile.username}`}</Text>
            <Text style={styles.profileDetailLabel}>Username</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>{contactProfile.getProfile.email}</Text>
            <Text style={styles.profileDetailLabel}>Email Address</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailValue}>
              {formatText(contactProfile.getProfile.location)}
            </Text>
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
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
});

export default ContactProfile;
