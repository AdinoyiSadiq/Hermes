import React, { useState } from 'react';
import {
  StyleSheet, View, Text, AsyncStorage
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import AuthInput from '../forms/AuthInput';
import Button from '../buttons/Button';

import validateAuth from '../../lib/validation';
import Colors from '../../constants/Colors';

import SIGNUP_MUTATION from '../../mutations/signup';

const fieldNames = ['firstname', 'lastname', 'username', 'location', 'email', 'password', 'confirmPassword'];

const SignupForm = ({ navigation }) => {
  const [authInput, setAuthInput] = useState({
    firstname: '',
    lastname: '',
    username: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {
      firstname: false,
      lastname: false,
      username: false,
      location: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
  });
  const [signup, {
    loading, error, data, client
  }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (text, field) => {
    setAuthInput({ ...authInput, [field]: text });
  };

  const handleBlur = (field) => {
    const { touched } = authInput;
    setAuthInput({ ...authInput, touched: { ...touched, [field]: true } });
  };

  const validateFields = () => {
    const validationError = validateAuth({
      firstname: authInput.firstname,
      lastname: authInput.lastname,
      username: authInput.username,
      location: authInput.location,
      email: authInput.email,
      password: authInput.password,
      confirmPassword: authInput.confirmPassword
    }, fieldNames);
    return validationError;
  };

  const handleSubmit = () => {
    const validationError = validateFields();
    if (validationError.status) {
      const isTouched = fieldNames.reduce((o, field) => ({ ...o, [field]: true }), {});
      setAuthInput({
        ...authInput,
        touched: { ...isTouched },
      });
    } else {
      signup({
        variables: {
          firstname: authInput.firstname.toLowerCase().trim(),
          lastname: authInput.lastname.toLowerCase().trim(),
          username: authInput.username.toLowerCase().trim(),
          location: authInput.location.toLowerCase().trim(),
          email: authInput.email.toLowerCase().trim(),
          password: authInput.password
        }
      });
    }
  };

  const authenticateUser = async () => {
    client.writeData({ data: { isAuth: true } });
    await AsyncStorage.setItem('authToken', data.signup.token);
    navigation.navigate('home');
  };

  if (data && data.signup) {
    authenticateUser();
  }

  const validationError = validateFields();

  return (
    <View style={styles.authInputFormContainer}>
      <AuthInput
        value={authInput.firstname}
        error={validationError.firstname}
        touched={authInput.touched.firstname}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="firstname"
        placeholder="First name"
      />
      <AuthInput
        value={authInput.lastname}
        error={validationError.lastname}
        touched={authInput.touched.lastname}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="lastname"
        placeholder="Last name"
      />
      <AuthInput
        value={authInput.username}
        error={validationError.username}
        touched={authInput.touched.username}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="username"
        placeholder="Username"
      />
      <AuthInput
        value={authInput.location}
        error={validationError.location}
        touched={authInput.touched.location}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="location"
        placeholder="Location"
      />
      <AuthInput
        value={authInput.email}
        error={validationError.email}
        touched={authInput.touched.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="email"
        placeholder="Email Address"
      />
      <AuthInput
        value={authInput.password}
        error={validationError.password}
        touched={authInput.touched.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="password"
        placeholder="Password"
        type="password"
      />
      <AuthInput
        value={authInput.confirmPassword}
        error={validationError.confirmPassword}
        touched={authInput.touched.confirmPassword}
        handleChange={handleChange}
        handleBlur={handleBlur}
        field="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
      {
        error
        && error.graphQLErrors
        && error.graphQLErrors[0].message
        && (
          <View style={styles.authErrorContainer}>
            <Text style={styles.authError}>{error.graphQLErrors[0].message}</Text>
          </View>
        )
      }
      <View style={styles.authButtonContainer}>
        <Button
          handlePress={handleSubmit}
          loading={loading}
          text="Create Account"
        />
      </View>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  authInputFormContainer: {
    width: '85%',
  },
  authButtonContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  authErrorContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  authError: {
    color: Colors.colorRed,
    fontSize: 11,
    fontFamily: 'Muli',
  }
});
