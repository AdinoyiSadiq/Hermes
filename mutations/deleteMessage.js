import { gql } from 'apollo-boost';

export default gql`
  mutation DELETE_MESSAGE (
    $messageId: Int!,
  ) {
    deleteMessage(messageId: $messageId) {
      id
      sender {
        id
      }
      receiver {
        id
      }
      quote {
        id
        text
      }
    }
  }
`;
