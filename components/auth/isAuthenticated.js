/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';

export default function (ComposedComponent, isAuthenticated) {
  class Authenticated extends Component {
    componentWillMount() {
      if (isAuthenticated) {
        const { navigation: { navigate } } = this.props;
        navigate('home');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authenticated;
}
