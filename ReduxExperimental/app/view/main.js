import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            this.props.navigation.navigate('ReduxView');
          }}
        >
          <Text>REDUX EXAMPLE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  }
});
