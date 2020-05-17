import { gql } from 'apollo-boost';

export default gql`
  query GET_CONTACT_PROFILE(
    $userId: Int!
  ) {
    getProfile(userId: $userId) {
      username
      firstname
      lastname
      email
      profileImage
      location
    }
  }
`;
