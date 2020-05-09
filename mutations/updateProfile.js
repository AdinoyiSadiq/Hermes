import { gql } from 'apollo-boost';

export default gql`
  mutation UPDATE_PROFILE (
    $username: String
    $firstname: String
    $lastname: String
    $email: String
    $profileImage: String
    $location: String
  ) {
    updateProfile(
      username: $username
      firstname: $firstname
      lastname: $lastname
      email: $email
      profileImage: $profileImage
      location: $location
    ) {
      username
      firstname
      lastname
      email
      profileImage
      location
    }
  }
`;
