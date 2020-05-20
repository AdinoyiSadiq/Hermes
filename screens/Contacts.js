/* eslint-disable max-len */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import UserListWrapper from './userList/UserListWrapper';
import Messages from './Messages';
import ContactProfile from './profile/ContactProfile';
import Colors from '../constants/Colors';
import Loader from '../components/loaders/Loader';
import UserContext from '../context/User';

import GET_ALL_CONTACTS from '../queries/getAllContacts';
import GET_CONTACT_PROFILE from '../queries/getContactProfile';
import GET_SENT_CONTACT_REQUESTS from '../queries/getSentContactRequests';
import GET_RECEIVED_CONTACT_REQUESTS from '../queries/getReceivedContactRequests';
import GET_REJECTED_CONTACT_REQUESTS from '../queries/getRejectedContactRequests';

const Stack = createStackNavigator();

export default function Contacts({ navigation, loading, authUserId }) {
  const {
    loading: contactsLoading, error: contactsError, data: contactsData
  } = useQuery(GET_ALL_CONTACTS);
  const [getContactProfile,
    { loading: contactProfileLoading, error: contactProfileError, data: contactProfileData }
  ] = useLazyQuery(GET_CONTACT_PROFILE);
  const {
    loading: contactSentRequestLoading, error: contactSentRequestError, data: contactSentRequestData
  } = useQuery(GET_SENT_CONTACT_REQUESTS);
  const {
    loading: contactReceivedRequestLoading, error: contactReceivedRequestError, data: contactReceivedRequestData
  } = useQuery(GET_RECEIVED_CONTACT_REQUESTS);
  const {
    loading: contactRejectedRequestLoading, error: contactRejectedRequestError, data: contactRejectedRequestData
  } = useQuery(GET_REJECTED_CONTACT_REQUESTS);

  const setTabBarVisibility = (state) => {
    navigation.setOptions({ tabBarVisible: state });
  };

  const getActiveUserProfile = (user) => {
    getContactProfile({ variables: { userId: user.id } });
  };

  if (
    loading
    || contactSentRequestLoading
    || contactReceivedRequestLoading
    || contactRejectedRequestLoading
    || !authUserId
  ) {
    return (
      <View style={styles.loaderContainer}>
        <Loader color="orange" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.colorWhite },
      }}
    >
      <Stack.Screen name="contactList">
        {(props) => {
          return (
            <UserContext.Provider value={{ authUserId, getActiveUserProfile }}>
              <UserListWrapper
                type="contact"
                loading={contactsLoading}
                data={contactsData && contactsData.getAllContacts}
                contactSentRequestData={contactSentRequestData && contactSentRequestData.getSentContactRequests}
                contactReceivedRequestData={contactReceivedRequestData && contactReceivedRequestData.getReceivedContactRequests}
                contactRejectedRequestData={contactRejectedRequestData && contactRejectedRequestData.getRejectedContactRequests}
                navigation={props.navigation}
              />
            </UserContext.Provider>
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="messages">
        {(props) => {
          return (
            <Messages
              setTabBarVisibility={setTabBarVisibility}
              navigation={props.navigation}
              route={props.route}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen name="contactProfile">
        {(props) => {
          return (
            <ContactProfile
              contactProfile={contactProfileData}
              loading={contactProfileLoading}
              navigation={props.navigation}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
});
