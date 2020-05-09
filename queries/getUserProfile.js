import { gql } from 'apollo-boost';

export default gql`
  query GET_USER_PROFILE {
    getProfile {
      username
      firstname
      lastname
      email
      profileImage
      location
    }
  }
`;
