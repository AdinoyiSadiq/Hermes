import { gql } from 'apollo-boost';

export default gql`
  subscription UPDATE_MESSAGE_SUBSCRIPTION (
    $senderId: Int! 
    $receiverId: Int!
  ) {
    updatedMessages(
      senderId: $senderId,
      receiverId: $receiverId
    ) {
      id
      state
      sender {
        id
      }
    }
  }
`;
