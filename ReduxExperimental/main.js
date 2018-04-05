import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MainAction } from './actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase() {
    this.props.actions.increase();
  }

  decrease() {
    this.props.actions.decrease();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>{this.props.number}</Text>
        <View style={styles.buttonView}>
          <Button title="Increase" onPress={this.increase} />
          <Button title="Decrease" onPress={this.decrease} />
        </View>
      </View>
    );
  }
}

const Button = props => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.texBtn}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonView: {
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10
  },
  textBtn: {
    color: 'white'
  },
  number: {
    fontSize: 40,
    color: 'black'
  }
});

const mapStateToProps = state => ({ ...state.Main });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MainAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);