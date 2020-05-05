import * as React from 'react';
import { View } from 'react-native';
import UserItem from './UserItem';

export default function UserList({
  navigation, type, data, users
}) {
  return (
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
                  />
                );
              })
            }
          </View>
        )
      }
    </View>
  );
}
