import { gql } from 'apollo-boost';

export default gql`
  subscription ACCEPTED_CONTACT_SUBSCRIPTION (
    $requesterId: Int! 
    $receiverId: Int!
  ) {
    acceptedContact(
      requesterId: $requesterId,
      receiverId: $receiverId
    ) 
  }
`;
