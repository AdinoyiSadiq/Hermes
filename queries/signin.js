import { gql } from 'apollo-boost';

export default gql`
  query SIGNIN (
    $email: String!,
    $password: String!
  ) {
    signin(
      email: $email, 
      password: $password,
    ) {
      userId
      token
    }
  }
`;
