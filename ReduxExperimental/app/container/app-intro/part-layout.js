import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { AppIntro } from '../../components';
import { IntroConfig } from '../../config';

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  leftImage: {
    width: 80,
    height: 30
  }
});

class PartLayout extends Component {
  constructor(props) {
    super(props);
    this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
    StatusBar.setBarStyle('light-content');
  }

  onSkipBtnHandle(index) {
    this.props.pop();
  }

  _renderHeader = () => (
    <View style={styles.rowContainer}>
      <Image
        style={styles.leftImage}
        resizeMode="stretch"
        source={require('./images/image_logosc.png')}
      />
      <Image source={require('./images/image_logosc_small.png')} />
    </View>
  );

  render() {
    return (
      <AppIntro
        onSkipBtnClick={this.onSkipBtnHandle}
        pageArray={IntroConfig.AppIntro}
        renderHeader={this._renderHeader}
      />
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  pop: () => dispatch(NavigationActions.pop())
});

export default connect(mapStateToProps, mapDispatchToProps)(PartLayout);
