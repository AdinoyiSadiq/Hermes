/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

export default function (ComposedComponent, isAuthenticated) {
  // Note: Ensure that when a user's token expires the app kicks them out
  class RequireAuth extends Component {
    componentWillMount() {
      if (!isAuthenticated) {
        const { navigation: { navigate } } = this.props;
        navigate('signup');
      }
    }

    componentWillUpdate() {
      if (!isAuthenticated) {
        const { navigation: { navigate } } = this.props;
        navigate('signup');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return RequireAuth;
}
