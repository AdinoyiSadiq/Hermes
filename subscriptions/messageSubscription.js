import { gql } from 'apollo-boost';

export default gql`
  subscription MESSAGE_SUBSCRIPTION (
    $senderId: Int! 
    $receiverId: Int!
  ) {
    message(
      senderId: $senderId,
      receiverId: $receiverId
    ) {
      id
      text
      image
      state
      createdAt
      quote {
        id
        text
        sender {
          id
          firstname
          lastname
        }
      }
      sender {
        id
        firstname
        lastname
      }
      receiver {
        id
      }
    }
  }
`;
