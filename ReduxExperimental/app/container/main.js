import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../components';
import { StringConfig } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="REDUX EXAMPLE"
          onPress={() => {
            this.props.navigation.navigate(StringConfig.REDUX_TITLE);
          }}
        />
        <Button
          title="AUTO LAYOUT"
          onPress={() => {
            this.props.navigation.navigate(StringConfig.AUTOLAYOUT_TITLE);
          }}
        />
      </View>
    );
  }
}
