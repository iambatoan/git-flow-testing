import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Colors } from '../constants';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.black
  },
  text: {
    width: 70
  }
});

export default class InformationInput extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{this.props.title}</Text>
        <TextInput style={styles.input} {...this.props} />
      </View>
    );
  }
}
