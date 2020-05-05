import { gql } from 'apollo-boost';

export default gql`
  query GET_ACTIVE_CHATS {
    getActiveUsers {
      id
      profileImage
      user {
        id
        firstname
        lastname
        lastseen
      }
      lastMessage {
        text
        image
        createdAt
      }
      unreadMessages
    }
  }
`;
