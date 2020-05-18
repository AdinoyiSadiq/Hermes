import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const getPermissionAsync = async () => {
  let status;
  if (Constants.platform.ios) {
    const res = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    status = res.status;
  }
  return status;
};

const selectImage = async (setImage, setApiError) => {
  try {
    const status = await getPermissionAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      Alert.alert('Sorry, we need camera roll permissions to make this work. Please change camera settings for Hermes.');
    }
  } catch (e) {
    setApiError({ message: 'An error occurred while selecting an image' });
  }
};

export default selectImage;
