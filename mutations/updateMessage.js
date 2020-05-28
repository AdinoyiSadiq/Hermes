import { gql } from 'apollo-boost';

export default gql`
  mutation UPDATE_MESSAGE (
    $state: String!,
    $messageIds: [Int!],
  ) {
    updateMessages(
      state: $state, 
      messageIds: $messageIds
    ) {
      id
    }
  }
`;
