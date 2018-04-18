import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from '../components';
import { StringConfig } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="REDUX EXAMPLE"
          onPress={() => {
            this.props.navigateToReduxExample();
          }}
        />
        <Button
          title="AUTO LAYOUT"
          onPress={() => {
            this.props.navigateToAutoLayoutExample();
          }}
        />
        <Button
          title="NETWORK"
          onPress={() => {
            this.props.navigateToNetworkExample();
          }}
        />
        <Button
          title="APP INTRO"
          onPress={() => {
            this.props.navigateToAppIntro();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  navigateToReduxExample: () =>
    dispatch(
      NavigationActions.navigate({ routeName: StringConfig.Redux.Name })
    ),
  navigateToAutoLayoutExample: () =>
    dispatch(
      NavigationActions.navigate({ routeName: StringConfig.AutoLayout.Name })
    ),
  navigateToNetworkExample: () =>
    dispatch(
      NavigationActions.navigate({ routeName: StringConfig.Network.Name })
    ),
  navigateToAppIntro: () =>
    dispatch(
      NavigationActions.navigate({ routeName: StringConfig.AppIntro.Name })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
