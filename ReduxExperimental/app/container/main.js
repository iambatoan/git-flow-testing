import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from '../components';
import { StringConfig } from '../config';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Main extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
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
          <Button
            title="MAP"
            onPress={() => {
              this.props.navigateToMapView();
            }}
          />
        </ScrollView>
      </SafeAreaView>
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
    ),
  navigateToMapView: () =>
    dispatch(NavigationActions.navigate({ routeName: StringConfig.Map.Name }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
