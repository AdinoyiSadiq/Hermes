import { gql } from 'apollo-boost';

export default gql`
  mutation REQUEST_CONTACT (
    $receiverId: Int!,
  ) {
    requestContact(receiverId: $receiverId) 
  }
`;
