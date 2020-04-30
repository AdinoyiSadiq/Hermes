import { gql } from 'apollo-boost';

export default gql`
  query {
    isAuth @client
  }
`;
