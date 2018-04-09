import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import API from '../api';
import { Colors, ErrorCode } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  responseView: {
    backgroundColor: Colors.responseBox,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.black
  },
  error: {
    color: Colors.red
  }
});

const requestStatus = {
  NOTHING: 'Nothing',
  FETCHING: 'Fetching',
  DONE: 'Done'
};

export default class NetworkView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: requestStatus.FETCHING,
      error: '',
      response: ''
    };
  }

  componentDidMount() {
    API.request()
      .then(response => {
        this.setState({
          status: requestStatus.DONE,
          response: String(response.data.map(item => item.title))
        });
      })
      .catch(error => {
        this.setState({ status: requestStatus.DONE });
        if (error.errorMessage) {
          this.setState({ error: error.errorMessage });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{`STATUS: ${this.state.status}`}</Text>
        {this.state.response.length !== 0 ? (
          <View style={styles.responseView}>
            <Text>{this.state.response}</Text>
          </View>
        ) : null}
        {this.state.error.length !== 0 ? (
          <Text style={styles.error}>{`ERROR: ${this.state.error}`}</Text>
        ) : null}
      </View>
    );
  }
}
