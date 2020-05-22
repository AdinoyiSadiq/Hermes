import { gql } from 'apollo-boost';

export default gql`
  subscription TYPING_SUBSCRIPTION (
    $senderId: Int! 
    $receiverId: Int!
  ) {
    typing(
      senderId: $senderId,
      receiverId: $receiverId
    ) 
  }
`;
