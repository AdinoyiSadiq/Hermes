import React from 'react';
import {
  StyleSheet, TextInput, Image, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const MessageInput = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={[styles.pickerContainer, styles.imagePickerContainer]}>
          <Image
            source={require('../../assets/images/image-picker-icon.png')}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.messageInputContainer}>
        <TextInput
          placeholder="Message..."
        />
      </View>
      <TouchableOpacity>
        <View style={[styles.pickerContainer, styles.emojiPickerContainer]}>
          <Image
            source={require('../../assets/images/emoji-picker-icon.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[styles.pickerContainer, styles.messageSendButtonContainer]}>
          <Image
            source={require('../../assets/images/message-send-icon.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
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
