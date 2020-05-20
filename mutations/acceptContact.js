import { gql } from 'apollo-boost';

export default gql`
  mutation ACCEPT_CONTACT_REQUEST (
    $requesterId: Int!,
  ) {
    acceptContact(requesterId: $requesterId) 
  }
`;
