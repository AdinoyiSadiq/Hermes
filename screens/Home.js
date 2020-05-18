/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Chats from './Chats';
import Contacts from './Contacts';
import Profile from './Profile';
import Colors from '../constants/Colors';
import ImageUploadContext from '../context/ImageUpload';
import imageUploader from '../lib/imageUploader';
import newActiveUserResponseMessage from '../lib/newActiveUserResponse';

import GET_AUTH_USER from '../queries/getAuthUser';
import GET_ACTIVE_CHATS from '../queries/getActiveChats';
import GET_MESSAGES from '../queries/getMessages';
import CREATE_MESSAGE from '../mutations/createMessage';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'chats';

const TabBarIcon = ({ focused, name }) => {
  const icon = (name === 'chats') ? require('../assets/images/chats-icon.png')
    : (name === 'contacts') ? require('../assets/images/contacts-icon.png')
      : require('../assets/images/profile-icon.png');
  const activeIcon = (name === 'chats') ? require('../assets/images/chats-active-icon.png')
    : (name === 'contacts') ? require('../assets/images/contacts-active-icon.png')
      : require('../assets/images/profile-active-icon.png');
  return (
    <Image source={focused ? activeIcon : icon} style={styles.tabIcon} />
  );
};

export default function Home() {
  const [uploadingImage, setUploadingImage] = useState({});
  const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

  const {
    loading: authUserLoading, error: authUserError, data: authUserData, client
  } = useQuery(GET_AUTH_USER);

  const sendImage = async ({ variables, imageFile, receiver }) => {
    setUploadingImage({ state: true, receiverId: receiver.id });
    const authUserId = authUserData && authUserData.getAuthUser && authUserData.getAuthUser.id;
    const uploadRes = await imageUploader(imageFile, authUserId);
    const imageUrl = uploadRes.data && uploadRes.data.secure_url;
    if (imageUrl) {
      const updatedVariables = variables;
      updatedVariables.image = imageUrl;
      updatedVariables.text = variables.text.trim();
      setUploadingImage({});

      createMessage({
        variables,
        // eslint-disable-next-line no-shadow
        update: (cache, { data: { createMessage } }) => {
          const activeUsers = cache.readQuery({ query: GET_ACTIVE_CHATS });
          const existingActiveUser = activeUsers
                                  && activeUsers.getActiveUsers
                                  && (activeUsers.getActiveUsers)
                                    .find((activeUser) => activeUser.user.id === receiver.id);
          const messageData = cache.readQuery({
            query: GET_MESSAGES,
            variables: { receiverId: receiver.id },
          });
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: { receiverId: receiver.id },
            data: { getMessages: [createMessage, ...messageData.getMessages] }
          });
          if (!existingActiveUser) {
            const newActiveUser = { ...(newActiveUserResponseMessage(receiver, createMessage)) };
            cache.writeQuery({
              query: GET_ACTIVE_CHATS,
              data: { getActiveUsers: [newActiveUser, ...activeUsers.getActiveUsers] }
            });
          } else {
            const updatedActiveUsersList = (activeUsers.getActiveUsers).map((activeUser) => {
              if (activeUser.user.id === receiver.id) {
                const updatedActiveUser = activeUser;
                updatedActiveUser.lastMessage.text = createMessage.text;
                updatedActiveUser.lastMessage.image = createMessage.image;
                updatedActiveUser.lastMessage.createdAt = createMessage.createdAt;

                return updatedActiveUser;
              }
              return activeUser;
            });
            cache.writeQuery({
              query: GET_ACTIVE_CHATS,
              data: { getActiveUsers: [...updatedActiveUsersList] }
            });
          }
        }
      });
    }
  };

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.colorOrange,
        inactiveTintColor: Colors.colorGreyDark,
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Muli',
        }
      }}
    >
      <BottomTab.Screen
        name="Chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chats" />,
        }}
      >
        {(props) => (
          <ImageUploadContext.Provider value={{ sendImage, uploadingImage }}>
            <Chats
              navigation={props.navigation}
              loading={authUserLoading}
              authUserId={authUserData && authUserData.getAuthUser && authUserData.getAuthUser.id}
            />
          </ImageUploadContext.Provider>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="contacts" />
        }}
      >
        {(props) => (
          <ImageUploadContext.Provider value={{ sendImage, uploadingImage }}>
            <Contacts
              navigation={props.navigation}
              loading={authUserLoading}
              authUserId={authUserData && authUserData.getAuthUser && authUserData.getAuthUser.id}
            />
          </ImageUploadContext.Provider>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="profile" />,
        }}
      >
        {(props) => (
          <Profile
            navigation={props.navigation}
            authUserId={authUserData && authUserData.getAuthUser && authUserData.getAuthUser.id}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    marginTop: 5,
  }
});
