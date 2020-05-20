import { gql } from 'apollo-boost';

export default gql`
  mutation CANCEL_CONTACT_REQUEST (
    $receiverId: Int!,
  ) {
    cancelContactRequest(receiverId: $receiverId) 
  }
`;
