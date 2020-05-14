import { gql } from 'apollo-boost';

export default gql`
  mutation CREATE_MESSAGE (
    $text: String!,
    $image: String,
    $receiverId: Int,
    $quoteId: Int,
  ) {
    createMessage(
      text: $text, 
      image: $image,
      receiverId: $receiverId,
      quoteId: $quoteId,
    ) {
      id
      text
      image
      state
      sender {
        id
        firstname
        lastname
      }
      receiver {
        id
      }
      quote {
        id
        text
        sender {
          id
          firstname
          lastname
        }
      }
      createdAt
    }
  }
`;
