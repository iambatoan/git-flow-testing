import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="REDUX EXAMPLE"
          onPress={() => {
            this.props.navigation.navigate('ReduxView');
          }}
        />
        <Button
          title="AUTO LAYOUT"
          onPress={() => {
            this.props.navigation.navigate('AutoLayoutView');
          }}
        />
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
  }
});
