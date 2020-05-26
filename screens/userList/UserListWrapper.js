/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView
} from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import UserList from '../../containers/user/UserList';
import UserListHeader from '../../containers/user/UserHeader';
import Loader from '../../components/loaders/Loader';
import Colors from '../../constants/Colors';

import SEARCH_CONTACTS from '../../queries/searchContacts';
import SEARCH_USERS from '../../queries/searchUsers';
import GET_ACTIVE_CHATS from '../../queries/getActiveChats';
import MESSAGE_SUBSCRIPTION from '../../subscriptions/messageSubscription';
import DELETED_MESSAGE_SUBSCRIPTION from '../../subscriptions/deletedMessageSubscription';
import ACCEPTED_CONTACT_SUBSCRIPTION from '../../subscriptions/acceptedContactSubscription';

export default function UserListWrapper({
  type,
  navigation,
  loading,
  data,
  client,
  contactSentRequestData,
  contactReceivedRequestData,
  contactRejectedRequestData,
  subscribeToMoreActiveChats,
  subscribeToMoreContacts,
  refetchActiveChats,
  refetchContacts,
  refetchSentContactRequests
}) {
  const [searchState, setSearchState] = useState(false);
  const [searchContacts, {
    loading: searchLoading, error: searchError, data: searchData,
  }] = useLazyQuery(SEARCH_CONTACTS);
  const [searchUsers, {
    loading: searchUserLoading, error: searchUserError, data: searchUserData
  }] = useLazyQuery(SEARCH_USERS);

  const search = (searchTerm) => {
    searchContacts({ variables: { searchTerm } });

    if (type === 'contact') {
      searchUsers({ variables: { searchTerm } });
    }
  };

  const filterUsers = (contacts, users) => {
    const contactIds = contacts.reduce((arr, o) => {
      arr.push(o.user.id);
      return arr;
    }, []);
    const filteredUsers = users.filter((userObj) => {
      return !contactIds.includes(userObj.user.id);
    });
    return filteredUsers;
  };

  const getRestrictedContacts = () => {
    let restrictedContacts = [];
    if (contactSentRequestData && contactReceivedRequestData && contactRejectedRequestData) {
      restrictedContacts = [
        ...contactSentRequestData,
        ...contactReceivedRequestData,
        ...contactRejectedRequestData
      ];
    }
    return restrictedContacts;
  };

  return (
    <View style={styles.container}>
      <UserListHeader
        search={search}
        setSearchState={setSearchState}
        title={type === 'chat' ? 'Active Chats' : 'Contact List'}
      />
      {(loading || searchLoading || searchUserLoading) ? (
        <View style={styles.loaderContainer}>
          <Loader color="orange" />
        </View>
      ) : (
        (searchState && searchData && searchData.searchContacts.length === 0)
        && ((searchState && searchUserData && searchUserData.searchUsers.length === 0) || type === 'chat')
      ) ? (
        <Text style={styles.emptyListText}>No users were found</Text>
        ) : (
          <ScrollView style={styles.userItemListContainer}>
            <UserList
              type={searchState ? 'search' : type}
              view={type}
              data={
                (searchState && searchData && searchData.searchContacts)
                || [...data, ...(getRestrictedContacts())]
              }
              users={
                searchState
                && searchUserData
                && searchUserData.searchUsers
                && filterUsers(searchData.searchContacts, searchUserData.searchUsers)
              }
              navigation={navigation}
              subscribeToNewMessages={({ senderId, receiverId }) => {
                if (subscribeToMoreActiveChats) {
                  subscribeToMoreActiveChats({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { senderId, receiverId },
                    updateQuery: () => {
                      refetchActiveChats();
                    }
                  });
                }
                if (subscribeToMoreContacts) {
                  subscribeToMoreContacts({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { senderId, receiverId },
                    updateQuery: () => {
                      const activeUsers = client.readQuery({ query: GET_ACTIVE_CHATS });
                      const existingActiveUser = activeUsers
                                && activeUsers.getActiveUsers
                                && (activeUsers.getActiveUsers)
                                  .find((activeUser) => activeUser.user.id === senderId);
                      if (!existingActiveUser) {
                        refetchActiveChats();
                      }
                    }
                  });
                }
              }}
              subscribeToDeletedMessages={({ senderId, receiverId }) =>
                subscribeToMoreActiveChats({
                  document: DELETED_MESSAGE_SUBSCRIPTION,
                  variables: { senderId, receiverId },
                  updateQuery: () => {
                    refetchActiveChats();
                  }
                })}
              subscribeToAcceptedContacts={({ requesterId, receiverId }) =>
                subscribeToMoreContacts({
                  document: ACCEPTED_CONTACT_SUBSCRIPTION,
                  variables: { requesterId, receiverId },
                  updateQuery: () => {
                    refetchContacts();
                    refetchSentContactRequests();
                  }
                })}
            />
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    ...ifIphoneX({
      paddingTop: '10%',
    }, {
      paddingTop: '5%',
    })
  },
  userItemListContainer: {
    paddingTop: '5%'
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
  },
  emptyListText: {
    color: Colors.colorBlack,
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  }
});
