import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        {...this.props}
      >
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1
  }
});
