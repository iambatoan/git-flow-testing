import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Colors } from '../constants';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    padding: 16,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1
  }
});

export default class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        {...this.props}
        style={[styles.button, this.props.style]}
      >
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
