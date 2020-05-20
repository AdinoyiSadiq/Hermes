const newContact = (user, authUserId) => {
  return {
    id: Math.floor(Math.random() * 1000000000),
    profileImage: user.profileImage,
    user: {
      id: user.id, firstname: user.firstname, lastname: user.lastname, lastseen: user.lastseen, __typename: 'User'
    },
    status: 0,
    actionUserId: authUserId,
    __typename: 'Contact',
  };
};

export default newContact;
