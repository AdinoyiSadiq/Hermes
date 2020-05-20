import React, { useState } from 'react';
import {
  StyleSheet, View, Image, Text, TouchableOpacity
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import UserImage from '../../components/profile/UserImage';
import Button from '../../components/buttons/Button';
import Loader from '../../components/loaders/Loader';
import formatText from '../../lib/formatText';
import newContactResponse from '../../lib/newContactResponse';
import Colors from '../../constants/Colors';

import REQUEST_CONTACT from '../../mutations/requestContact';
import CANCEL_CONTACT_REQUEST from '../../mutations/cancelContactRequest';
import ACCEPT_CONTACT_REQUEST from '../../mutations/acceptContact';
import REJECT_CONTACT_REQUEST from '../../mutations/rejectContact';
import GET_SENT_CONTACT_REQUESTS from '../../queries/getSentContactRequests';
import GET_RECEIVED_CONTACT_REQUESTS from '../../queries/getReceivedContactRequests';

const RestrictedContact = ({
  user, authUserId, updateUser, navigateBack
}) => {
  const [requestState, setRequestState] = useState(false);
  const [cancelRequestState, setCancelRequestState] = useState(false);
  const [rejectRequestState, setRejectRequestState] = useState(false);
  const [requestContact, {
    loading: requestContactLoading
  }] = useMutation(REQUEST_CONTACT);
  const [cancelContactRequest, {
    loading: cancelContactRequestLoading
  }] = useMutation(CANCEL_CONTACT_REQUEST);
  const [acceptContact, { loading: acceptContactLoading }] = useMutation(ACCEPT_CONTACT_REQUEST);
  const [rejectContact, { loading: rejectContactLoading }] = useMutation(REJECT_CONTACT_REQUEST);

  const requestUserContact = async () => {
    const response = await requestContact({
      variables: { receiverId: user.id },
      update: (cache) => {
        const userContactRequests = cache.readQuery({ query: GET_SENT_CONTACT_REQUESTS });
        const newUserContact = { ...(newContactResponse(user, authUserId)) };
        cache.writeQuery({
          query: GET_SENT_CONTACT_REQUESTS,
          data: {
            getSentContactRequests: [newUserContact, ...userContactRequests.getSentContactRequests]
          }
        });
      }
    });
    if (response && response.data && response.data.requestContact) {
      setRequestState(true);
    }
  };

  const cancelUserContactRequest = async () => {
    const response = await cancelContactRequest({
      variables: { receiverId: user.id },
      update: (cache) => {
        const userContactRequests = cache.readQuery({ query: GET_SENT_CONTACT_REQUESTS });
        cache.writeQuery({
          query: GET_SENT_CONTACT_REQUESTS,
          data: {
            getSentContactRequests: (
              userContactRequests
                .getSentContactRequests
                .filter((contact) => contact.user.id !== user.id)
            )
          }
        });
      }
    });

    if (response && response.data && response.data.cancelContactRequest) {
      setCancelRequestState(true);
    }
  };

  const acceptUserContactRequest = async () => {
    await acceptContact({
      variables: { requesterId: user.id },
      update: () => {
        updateUser(true);
      }
    });
  };

  const rejectUserContactRequest = async () => {
    const response = await rejectContact({
      variables: { requesterId: user.id },
      update: (cache) => {
        const userContactRequests = cache.readQuery({ query: GET_RECEIVED_CONTACT_REQUESTS });
        cache.writeQuery({
          query: GET_RECEIVED_CONTACT_REQUESTS,
          data: {
            getReceivedContactRequests: (
              userContactRequests
                .getReceivedContactRequests
                .filter((contact) => contact.user.id !== user.id)
            )
          }
        });
      }
    });

    if (response && response.data && response.data.rejectContact) {
      setRejectRequestState(true);
    }
  };

  const showActionButton = () => {
    const status = user.contact ? user.contact.status : user.status;
    const actionUserId = user.contact ? user.contact.actionUserId : user.actionUserId;
    if (!status && !actionUserId) {
      return (
        <View>
          {
            requestState ? (
              <Text style={styles.userProfileMessageSuccess}>
                Request Sent!
              </Text>
            ) : (
              <View style={styles.userProfileButtonContainer}>
                <Button
                  loading={requestContactLoading}
                  text="Add Contact"
                  handlePress={requestUserContact}
                />
              </View>
            )
          }
        </View>
      );
    }
    if ((!status && actionUserId === authUserId) || (status && actionUserId !== authUserId)) {
      return (
        <View>
          {
            cancelRequestState ? (
              <Text style={styles.userProfileMessageSuccess}>
                Request Cancelled!
              </Text>
            ) : (
              <>
                <Text style={styles.userProfileMessage}>
                  {`Waiting for ${formatText(user.firstname)} to respond to your request`}
                </Text>
                <View style={styles.userProfileButtonContainer}>
                  <Button
                    loading={cancelContactRequestLoading}
                    text="Cancel Request"
                    handlePress={cancelUserContactRequest}
                  />
                </View>
              </>
            )
          }
        </View>
      );
    }
    if (!status && actionUserId !== authUserId) {
      return (
        <View>
          {
            rejectRequestState ? (
              <Text style={styles.userProfileMessageSuccess}>
                Request Declined!
              </Text>
            ) : (
              <>
                <Text style={styles.userProfileMessage}>
                  {`${formatText(user.firstname)} would like to add you as a contact`}
                </Text>
                <View style={styles.userProfileDoubleButtonContainer}>
                  <Button
                    size="flex"
                    loading={acceptContactLoading || rejectContactLoading}
                    text="Accept"
                    handlePress={acceptUserContactRequest}
                  />
                  <Button
                    size="flex"
                    loading={acceptContactLoading || rejectContactLoading}
                    text="Decline"
                    handlePress={rejectUserContactRequest}
                  />
                </View>
              </>
            )
          }
        </View>
      );
    }
    if (status === 2 && actionUserId === authUserId) {
      return (
        <Text style={styles.userProfileMessageSuccess}>
          Request Declined!
        </Text>
      );
    }

    return <View />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButtonContainer} onPress={navigateBack}>
          <Image source={require('../../assets/images/back-button-icon.png')} />
        </TouchableOpacity>
      </View>
      {
        (acceptContactLoading || rejectContactLoading) ? (
          <View style={styles.loaderContainer}>
            <Loader color="orange" />
          </View>
        ) : (
          <View style={styles.userProfile}>
            <UserImage user={user} size="large" />
            <View>
              <Text style={styles.userNameText}>
                {`${formatText(user.firstname)} ${formatText(user.lastname)}`}
              </Text>
            </View>
            <View style={styles.userProfileActionButtonContainer}>
              { showActionButton() }
            </View>
          </View>
        )
      }
    </View>
  );
};

export default RestrictedContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    }),
  },
  header: {
    height: 60,
    paddingLeft: 16,
    justifyContent: 'center',

  },
  userProfile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameText: {
    marginTop: 15,
    fontFamily: 'Muli',
    fontSize: 18,
    color: Colors.colorBlack1
  },
  userProfileActionButtonContainer: {
    marginTop: 25,
  },
  userProfileMessageSuccess: {
    fontFamily: 'Muli',
    fontSize: 20,
    color: Colors.colorOrange
  },
  userProfileMessage: {
    fontFamily: 'Muli',
    fontSize: 15,
    marginBottom: '4%',
    textAlign: 'center'
  },
  userProfileButtonContainer: {
    alignItems: 'center'
  },
  userProfileDoubleButtonContainer: {
    flexDirection: 'row'
  },
  navButtonContainer: {
    alignSelf: 'flex-start',
    padding: '5%',
    paddingLeft: 0
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
});
