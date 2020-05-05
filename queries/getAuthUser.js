import { gql } from 'apollo-boost';

export default gql`
  query GET_AUTH_USER {
    getAuthUser {
      id
    }
  }
`;
