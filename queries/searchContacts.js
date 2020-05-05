import { gql } from 'apollo-boost';

export default gql`
  query SEARCH_CONTACTS (
    $searchTerm: String!
  ) {
    searchContacts(searchTerm: $searchTerm) {
      id
      status
      profileImage
      user {
        id
        firstname
        lastname
        lastseen
      }
    }
  }
`;
