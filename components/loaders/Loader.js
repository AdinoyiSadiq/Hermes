import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loader = () => {
  return (
    <ActivityIndicator color={Colors.colorWhite} />
  );
};

export default Loader;
