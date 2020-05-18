import React, { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  StyleSheet, TextInput, Image, View, TouchableOpacity
} from 'react-native';
import MessageInputModifier from '../../components/messages/MessageInputModifier';
import optimisticResponseMessage from '../../lib/optimisticResponse';
import newActiveUserResponseMessage from '../../lib/newActiveUserResponse';
import Colors from '../../constants/Colors';
import CREATE_MESSAGE from '../../mutations/createMessage';
import GET_ACTIVE_CHATS from '../../queries/getActiveChats';
import GET_MESSAGES from '../../queries/getMessages';
import selectImage from '../../lib/selectImage';

const MessageInput = ({
  user, authUserId, messageToReply, handleMessageToReply, sendImage
}) => {
  const messageInputRef = useRef();
  const messageInputCaptionRef = useRef();
  const [message, setMessage] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    clearImage();
    setMessage('');
    handleMessageToReply('');
  }, [user]);

  useEffect(() => {
    if (messageToReply) {
      if (image) {
        clearImage();
      } else {
        messageInputRef.current.focus();
      }
    }
  }, [messageToReply]);

  useEffect(() => {
    if (image) {
      messageInputCaptionRef.current.focus();
    }
  }, [image]);

  const [createMessage, {
    loading, error, data, client
  }] = useMutation(CREATE_MESSAGE);

  const handleChange = (text, type) => {
    if (type === 'message') {
      setMessage(text);
    } else if (type === 'caption') {
      setCaption(text);
    }
  };

  const pickImage = () => {
    selectImage(setImage, () => {});
    handleMessageToReply(false);
  };

  const clearImage = () => {
    setImage(null);
    setCaption('');
  };

  const handleSubmit = () => {
    setMessage('');
    handleMessageToReply(false);
    if (image) {
      const variables = { text: caption, receiverId: user.id };
      sendImage({ variables, imageFile: image, receiver: user });
      clearImage();
    } else if (message && message.trim()) {
      const variables = { text: message.trim(), receiverId: user.id };
      if (messageToReply) variables.quoteId = messageToReply.id;
      createMessage({
        variables,
        optimisticResponse: {
          ...(optimisticResponseMessage(authUserId, user, message, messageToReply))
        },
        // eslint-disable-next-line no-shadow
        update: (cache, { data: { createMessage } }) => {
          const activeUsers = cache.readQuery({ query: GET_ACTIVE_CHATS });
          const existingActiveUser = activeUsers
                                      && activeUsers.getActiveUsers
                                      && (activeUsers.getActiveUsers)
                                        .find((activeUser) => activeUser.user.id === user.id);
          // eslint-disable-next-line no-shadow
          const data = cache.readQuery({
            query: GET_MESSAGES,
            variables: {
              receiverId: user.id,
            },
          });
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: { receiverId: user.id },
            data: { getMessages: [createMessage, ...data.getMessages] }
          });
          if (!existingActiveUser) {
            const newActiveUser = { ...(newActiveUserResponseMessage(user, createMessage)) };
            cache.writeQuery({
              query: GET_ACTIVE_CHATS,
              data: { getActiveUsers: [newActiveUser, ...activeUsers.getActiveUsers] }
            });
          } else {
            const updatedActiveUsersList = (activeUsers.getActiveUsers).map((activeUser) => {
              const updatedActiveUser = activeUser;
              if (activeUser.user.id === user.id) {
                updatedActiveUser.lastMessage.text = createMessage.text;
                updatedActiveUser.lastMessage.createdAt = createMessage.createdAt;
                updatedActiveUser.lastMessage.image = null;
              }
              return updatedActiveUser;
            });
            cache.writeQuery({
              query: GET_ACTIVE_CHATS,
              data: { getActiveUsers: [...updatedActiveUsersList] }
            });
          }
        }
      });
    }
  };

  return (
    <>
      <MessageInputModifier
        messageToReply={messageToReply}
        handleMessageToReply={handleMessageToReply}
        image={image}
        clearImage={clearImage}
      />
      {
        image ? (
          <View style={styles.container}>
            <View style={styles.messageInputCaptionContainer}>
              <TextInput
                ref={messageInputCaptionRef}
                value={caption}
                onChangeText={(text) => handleChange(text, 'caption')}
                placeholder="Add a caption"
              />
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={[styles.pickerContainer, styles.messageSendButtonContainer]}>
                <Image
                  source={require('../../assets/images/message-send-icon.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
              <View style={[styles.pickerContainer, styles.imagePickerContainer]}>
                <Image
                  source={require('../../assets/images/image-picker-icon.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.messageInputContainer}>
              <TextInput
                ref={messageInputRef}
                value={message}
                onChangeText={(text) => handleChange(text, 'message')}
                placeholder="Type a message"
              />
            </View>
            <TouchableOpacity>
              <View style={[styles.pickerContainer, styles.emojiPickerContainer]}>
                <Image
                  source={require('../../assets/images/emoji-picker-icon.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={[styles.pickerContainer, styles.messageSendButtonContainer]}>
                <Image
                  source={require('../../assets/images/message-send-icon.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.colorOrangeLight
  },
  messageInputContainer: {
    width: '62.5%',
  },
  messageInputCaptionContainer: {
    flex: 1,
    paddingLeft: 10
  },
  pickerContainer: {
    height: 32,
    width: 32,
    borderRadius: 60,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colorOrangeLight1,
  },
  messageSendButtonContainer: {
    marginRight: 0,
    backgroundColor: Colors.colorOrange
  }
});

export default MessageInput;
