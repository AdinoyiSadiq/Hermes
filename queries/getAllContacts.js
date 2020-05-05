import { gql } from 'apollo-boost';

export default gql`
  query GET_ALL_CONTACTS {
    getAllContacts {
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
