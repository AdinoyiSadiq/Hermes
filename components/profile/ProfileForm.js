/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Button from '../buttons/Button';
import ProfileInput from '../forms/ProfileInput';
import UPDATE_PROFILE from '../../mutations/updateProfile';
import Colors from '../../constants/Colors';
import formatText from '../../lib/formatText';
import validateAuth from '../../lib/validation';
import imageUploader from '../../lib/imageUploader';
import selectImage from '../../lib/selectImage';

const fieldNames = ['firstname', 'lastname', 'username', 'location', 'email'];

export default function ProfileForm({
  profile, fetchProfile, navigation, authUserId,
}) {
  const [inputValue, setInputValue] = useState({
    firstname: (profile && profile.firstname) || '',
    lastname: (profile && profile.lastname) || '',
    username: (profile && profile.username) || '',
    email: (profile && profile.email) || '',
    location: (profile && profile.location) || '',
    profileImage: (profile && profile.profileImage) || null,
  });
  const [image, setImage] = useState(null);
  const [touchedInput, setTouchedInput] = useState({});
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [apiError, setApiError] = useState({});

  const [updateProfile, {
    loading, error, data, client
  }] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetUserDetails();
    });

    return unsubscribe;
  }, [navigation]);

  const resetUserDetails = () => {
    setInputValue({
      firstname: profile && profile.firstname,
      lastname: profile && profile.lastname,
      username: profile && profile.username,
      email: profile && profile.email,
      location: profile && profile.location,
      profileImage: profile && profile.profileImage,
    });
    setTouchedInput({});
  };

  const validateFields = () => {
    const validationError = validateAuth({
      firstname: inputValue.firstname,
      lastname: inputValue.lastname,
      username: inputValue.username,
      location: inputValue.location,
      email: inputValue.email,
    }, fieldNames);
    return validationError;
  };

  const pickImage = () => {
    selectImage(setImage, setApiError);
  };

  const uploadImage = async () => {
    try {
      let imageUrl;
      setApiError({});
      if (image) {
        setImageUploadLoading(true);
        const uploadRes = await imageUploader(image, authUserId);
        imageUrl = uploadRes.data && uploadRes.data.secure_url;
        setImageUploadLoading(false);
      }
      return imageUrl;
    } catch (e) {
      setApiError({ message: 'An error occurred during upload' });
      setImageUploadLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedInputValues = Object.keys(inputValue)
        .filter((key) => inputValue[key] !== profile[key])
        .reduce((res, key) => {
          res[key] = inputValue[key];
          return res;
        }, {});
      const uploadedImage = await uploadImage();
      if (uploadedImage) {
        updatedInputValues.profileImage = uploadedImage;
      }

      if (Object.keys(updatedInputValues).length) {
        const res = await updateProfile({ variables: { ...updatedInputValues } });
        if (res && res.data && res.data.updateProfile) {
          setImage(null);
          fetchProfile();
        }
      }
    } catch (e) {
      setApiError({ message: e.message });
    }
  };

  const renderProfileImage = () => {
    if (image || profile.profileImage) {
      return (
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: (image || profile.profileImage) }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.profileImagePlaceholder} onPress={pickImage}>
        <Text style={styles.profileImagePlaceholderText}>PB</Text>
        <Image style={styles.imageSelectorIcon} source={require('../..//assets/images/image-selector-icon.png')} />
      </TouchableOpacity>
    );
  };

  const validationError = validateFields();

  return (
    <View style={styles.profileFormContainer}>
      { renderProfileImage() }
      <ProfileInput
        value={formatText(inputValue.firstname)}
        error={validationError.firstname}
        touched={touchedInput.firstname}
        handleChange={(text) => setInputValue({
          ...inputValue,
          firstname: text.toLowerCase().trim()
        })}
        handleBlur={() => setTouchedInput({ ...touchedInput, firstname: true })}
        field="firstname"
        label="First Name"
        placeholder="Enter Your First Name"
      />
      <ProfileInput
        value={formatText(inputValue.lastname)}
        error={validationError.lastname}
        touched={touchedInput.lastname}
        handleChange={(text) => setInputValue({
          ...inputValue,
          lastname: text.toLowerCase().trim()
        })}
        handleBlur={() => setTouchedInput({ ...touchedInput, lastname: true })}
        field="lastname"
        label="Last Name"
        placeholder="Enter Your Last Name"
      />
      <ProfileInput
        value={inputValue.username}
        error={validationError.username}
        touched={touchedInput.username}
        handleChange={(text) => setInputValue({
          ...inputValue,
          username: text.toLowerCase().trim()
        })}
        handleBlur={() => setTouchedInput({ ...touchedInput, username: true })}
        field="username"
        label="Username"
        placeholder="Enter Your Username"
      />
      <ProfileInput
        value={inputValue.email}
        error={validationError.email}
        touched={touchedInput.email}
        handleChange={(text) => setInputValue({
          ...inputValue,
          email: text.toLowerCase().trim()
        })}
        handleBlur={() => setTouchedInput({ ...touchedInput, email: true })}
        field="email"
        label="Email Address"
        placeholder="Enter Your Email Address"
      />
      <ProfileInput
        value={formatText(inputValue.location)}
        error={validationError.location}
        touched={touchedInput.location}
        handleChange={(text) => setInputValue({
          ...inputValue,
          location: text.toLowerCase().trim()
        })}
        handleBlur={() => setTouchedInput({ ...touchedInput, location: true })}
        field="location"
        label="Location"
        placeholder="Enter Your Location"
      />
      {apiError && apiError.message && <Text style={styles.profileError}>{apiError.message}</Text>}
      <View style={styles.profileButtonContainer}>
        <Button
          handlePress={handleSubmit}
          loading={loading || imageUploadLoading}
          text="Update Profile"
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  profileFormContainer: {
    paddingTop: '5%',
    alignItems: 'center'
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 300,
  },
  profileImagePlaceholder: {
    position: 'relative',
    height: 140,
    width: 140,
    borderRadius: 300,
    backgroundColor: Colors.colorOrangeLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontFamily: 'Muli',
    fontSize: 60,
    color: Colors.colorWhite
  },
  imageSelectorIcon: {
    position: 'absolute',
  },
  profileButtonContainer: {
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  profileError: {
    color: Colors.colorRed,
    fontSize: 11,
    fontFamily: 'Muli',
    marginTop: 10,
  }
});
