import { gql } from 'apollo-boost';

export default gql`
  mutation SIGNUP (
    $firstname: String!,
    $lastname: String!,
    $username: String!,
    $location: String!,
    $email: String!,
    $password: String!
  ) {
    signup(
      firstname: $firstname, 
      lastname: $lastname,
      username: $username,
      location: $location,
      email: $email, 
      password: $password,
    ) {
      userId
      token
    }
  }
`;
