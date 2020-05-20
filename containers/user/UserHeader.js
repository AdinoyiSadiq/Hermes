import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, Image, View, TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors';

const UserHeader = ({ title, search, setSearchState }) => {
  const [inputActive, setInputActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const icon = require('../../assets/images/search-icon.png');

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchState(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    search(searchTerm);
    setSearchState(true);
  };

  const clearInput = () => {
    setSearchTerm('');
    setSearchState(false);
  };

  const closeSearch = () => {
    clearInput();
    setInputActive(false);
  };

  const renderCancelButton = () => {
    if (searchTerm) {
      return (
        <Image
          source={require('../../assets/images/cancel-icon.png')}
        />
      );
    }
    return <View />;
  };

  if (inputActive) {
    return (
      <View style={[styles.headerContainer, styles.marginBottom]}>
        <TextInput
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={styles.searchInput}
          autoFocus
        />
        <View style={styles.clearButtonContainer}>
          <TouchableOpacity
            onPress={() => clearInput()}
          >
            { renderCancelButton() }
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => closeSearch()}
          style={styles.cancelContainer}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.headerContainer, styles.marginTop]}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={() => setInputActive(true)}>
        <Image source={icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 18,
    fontFamily: 'Muli-Bold',
    fontWeight: '600',
  },
  searchInput: {
    height: 48,
    width: '70%',
    backgroundColor: Colors.colorOrangeLight,
    borderRadius: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 20,
    marginTop: 16,
  },
  clearButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: 16,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: Colors.colorOrangeLight,
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 5,
  },
  hide: {
    display: 'none',
  },
  marginTop: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  }
});

export default UserHeader;
