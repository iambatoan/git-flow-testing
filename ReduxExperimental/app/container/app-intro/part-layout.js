import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { AppIntro } from '../../components';
import { IntroConfig } from '../../config';

class PartLayout extends Component {
  constructor(props) {
    super(props);
    this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
  }

  onSkipBtnHandle(index) {
    this.props.pop();
  }

  render() {
    return (
      <AppIntro onSkipBtnClick={this.onSkipBtnHandle} pageArray={IntroConfig} />
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  pop: () => dispatch(NavigationActions.pop())
});

export default connect(mapStateToProps, mapDispatchToProps)(PartLayout);
