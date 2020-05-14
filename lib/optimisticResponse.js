const optimisticResponseMessage = (authUserId, user, message, messageToReply) => {
  return {
    __typename: 'Mutation',
    createMessage: {
      __typename: 'Message',
      id: Math.floor(Math.random() * 1000000000),
      text: message,
      image: '',
      state: '',
      createdAt: Date.now(),
      quote: messageToReply ? [{
        id: messageToReply.id,
        text: messageToReply.text,
        sender: {
          __typename: 'User',
          id: messageToReply.sender.id,
          firstname: '',
          lastname: '',
        },
        __typename: 'Message',
      }] : [],
      sender: {
        __typename: 'User',
        id: authUserId,
        firstname: '',
        lastname: '',
      },
      receiver: {
        __typename: 'User',
        id: user.id,
      }
    }
  };
};

export default optimisticResponseMessage;
