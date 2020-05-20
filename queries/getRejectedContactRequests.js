import { gql } from 'apollo-boost';

export default gql`
  query GET_REJECTED_CONTACT_REQUESTS {
    getRejectedContactRequests {
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
