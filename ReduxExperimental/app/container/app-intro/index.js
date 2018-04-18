import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Button } from '../../components';
import { StringConfig } from '../../config';

import FullLayout from './full-layout';
import PartLayout from './part-layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class AppIntro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="FULL LAYOUT SLIDE"
          onPress={() => {
            this.props.navigateToFullLayout();
          }}
        />
        <Button
          title="PART LAYOUT SLIDE"
          onPress={() => {
            this.props.navigateToPartLayout();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  navigateToFullLayout: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: StringConfig.AppIntroFullLayout.Name
      })
    ),
  navigateToPartLayout: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: StringConfig.AppIntroPartLayout.Name
      })
    )
});

export { FullLayout, PartLayout };
export default connect(mapStateToProps, mapDispatchToProps)(AppIntro);
