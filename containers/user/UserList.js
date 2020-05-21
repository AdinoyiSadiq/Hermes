import * as React from 'react';
import { View } from 'react-native';
import UserItem from './UserItem';
import UserContext from '../../context/User';

export default function UserList({
  navigation, type, data, users, subscribeToNewMessages
}) {
  return (
    <UserContext.Consumer>
      {({ authUserId, getActiveUserProfile }) => (
        <View>
          {
            (type === 'chat') ? (
              data && data.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
                .map((item) => {
                  return (
                    <UserItem
                      key={item.id}
                      item={item}
                      type={type}
                      navigation={navigation}
                      subscribeToNewMessages={subscribeToNewMessages}
                      authUserId={authUserId}
                      getActiveUserProfile={getActiveUserProfile}
                      active
                    />
                  );
                })
            ) : (
              <View>
                {
                  data.map((item) => {
                    return (
                      <UserItem
                        key={item.id}
                        item={item}
                        type={type}
                        navigation={navigation}
                        authUserId={authUserId}
                        getActiveUserProfile={getActiveUserProfile}
                      />
                    );
                  })
                }
                {
                  users && users.map((item) => {
                    return (
                      <UserItem
                        key={item.id || item.user.id}
                        item={item}
                        navigation={navigation}
                        authUserId={authUserId}
                        getActiveUserProfile={getActiveUserProfile}
                      />
                    );
                  })
                }
              </View>
            )
          }
        </View>
      )}
    </UserContext.Consumer>
  );
}
