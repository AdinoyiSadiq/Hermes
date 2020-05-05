import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loader = ({ color }) => {
  const spinnerColor = color === 'orange' ? Colors.colorOrange : Colors.colorWhite;
  return (
    <ActivityIndicator color={spinnerColor} />
  );
};

export default Loader;
