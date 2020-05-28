import React, { useState } from 'react';
import {
  StyleSheet, View, Text, AsyncStorage
} from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import AuthInput from '../forms/AuthInput';
import Button from '../buttons/Button';

import validateAuth from '../../lib/validation';
import Colors from '../../constants/Colors';

import SIGNIN_QUERY from '../../queries/signin';

const fieldNames = ['email', 'password'];

const SignupForm = () => {
  const [authInput, setAuthInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    touched: {
      email: false,
      password: false,
    },
  });
  const [signin, {
    loading, error, data, client
  }] = useLazyQuery(SIGNIN_QUERY);

  const handleChange = (text, field) => {
    setAuthInput({ ...authInput, [field]: text });
  };

  const handleBlur = (field) => {
    const { touched } = authInput;
    setAuthInput({ ...authInput, touched: { ...touched, [field]: true } });
  };

  const validateFields = () => {
    const validationError = validateAuth({
      email: authInput.email,
      password: authInput.password
    }, fieldNames);
    return validationError;
  };

  const handleSubmit = () => {
    const validationError = validateFields();
    if (validationError.status) {
      setAuthInput({
        ...authInput,
        touched: { email: true, password: true },
      });
    } else {
      signin({
        variables: {
          email: authInput.email.toLowerCase().trim(),
          password: authInput.password
        }
      });
    }
  };

  const authenticateUser = async () => {
    await AsyncStorage.setItem('authToken', data.signin.token);
    client.writeData({ data: { isAuth: true } });
  };

  if (data && data.signin) {
    authenticateUser();
  }

  const validationError = validateFields();

  return (
    <View style={styles.authInputFormContainer}>
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
      {
        error
        && error.graphQLErrors
        && error.graphQLErrors[0]
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
          text="Sign In"
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
