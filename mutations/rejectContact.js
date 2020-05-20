import { gql } from 'apollo-boost';

export default gql`
  mutation REJECT_CONTACT_REQUEST (
    $requesterId: Int!,
  ) {
    rejectContact(requesterId: $requesterId) 
  }
`;
