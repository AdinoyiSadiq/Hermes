const newActiveUser = (user, createMessage) => {
  return {
    id: Math.floor(Math.random() * 1000000000),
    profileImage: user.profileImage,
    user: {
      id: user.id, firstname: user.firstname, lastname: user.lastname, lastseen: user.lastseen, __typename: 'User'
    },
    lastMessage: {
      text: createMessage.text,
      createdAt: createMessage.createdAt,
      image: createMessage.image,
      __typename: 'Message',
    },
    unreadMessages: 0,
    __typename: 'ActiveUser',
  };
};

export default newActiveUser;
