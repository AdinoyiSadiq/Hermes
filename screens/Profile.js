import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import ProfileHeader from '../containers/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import Loader from '../components/loaders/Loader';
import Colors from '../constants/Colors';

import GET_USER_PROFILE from '../queries/getUserProfile';

export default function Profile({ navigation, authUserId }) {
  const [profileLoading, setProfileLoading] = useState(false);
  const {
    loading, data,
  } = useQuery(GET_USER_PROFILE);

  const refetchProfile = async () => {
    setProfileLoading(true);
    setProfileLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileHeader title="Your Profile" />
      </View>
      {
        (loading || profileLoading || !authUserId) ? (
          <View style={styles.loaderContainer}>
            <Loader color="orange" />
          </View>
        ) : (
          <ScrollView
            style={{ backgroundColor: 'white' }}
          >
            <ProfileForm
              profile={data && data.getProfile}
              fetchProfile={refetchProfile}
              navigation={navigation}
              authUserId={authUserId}
            />
          </ScrollView>
        )
      }
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
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
});
