import { gql } from 'apollo-boost';

export default gql`
  query GET_RECEIVED_CONTACT_REQUESTS {
    getReceivedContactRequests {
      id
      status
      profileImage
      actionUserId
      user {
        id
        firstname
        lastname
        lastseen
      }
    }
  }
`;
