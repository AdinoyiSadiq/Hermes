import { gql } from 'apollo-boost';

export default gql`
  query SEARCH_USERS (
    $searchTerm: String!
  ) {
    searchUsers(searchTerm: $searchTerm) {
      profileImage
      user {
        id
        firstname
        lastname
        lastseen
      }
      contact {
        status
        actionUserId
      }
    }
  }
`;
