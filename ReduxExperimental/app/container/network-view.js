import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import API from '../api';
import { Parser } from '../utils';
import { Colors } from '../constants';
import { Button, InformationInput } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  button: {
    backgroundColor: Colors.white
  },
  error: {
    marginVertical: 10,
    color: Colors.red,
    textAlign: 'center'
  },
  loadingView: {
    marginTop: 15
  },
  userTitle: {
    marginVertical: 10
  }
});

const requestStatus = {
  HAVENT_YET_LOG: 1,
  LOGGED: 2
};

// "email": "marthavangra@gmail.com",
// "password": "helloXtayPro"

export default class NetworkView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.email = '';
    this.password = '';

    this.onChangeEmail = this._handleChangeEmail.bind(this);
    this.onChangePassword = this._handleChangePassword.bind(this);
    this.login = this._handleLogin.bind(this);
    this.logout = this._handleLogout.bind(this);
    this.getUserInfor = this._getUserInfor.bind(this);

    this.initialState = {
      status: requestStatus.HAVENT_YET_LOG,
      error: '',
      accesstoken: '',
      loading: false,
      user: {}
    };

    this.state = this.initialState;
  }

  componentWillUnmount() {
    API.cancelRequest();
  }

  _handleChangeEmail(text) {
    this.email = text;
  }

  _handleChangePassword(text) {
    this.password = text;
  }

  _handleLogin() {
    this.setState({ loading: true });
    API.login({ email: this.email, password: this.password })
      .then(resp => {
        this.setState({
          loading: false,
          status: requestStatus.LOGGED,
          accesstoken: resp.data.access_token,
          error: ''
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.errorMessage
        });
      });
  }

  _handleLogout() {
    API.logout(this.state.accesstoken)
      .then(resp => {
        this.email = '';
        this.password = '';
        this.setState({
          ...this.initialState
        });
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage
        });
      });
  }

  _getUserInfor() {
    this.setState({ loading: true });
    API.getUserInfo(this.state.accesstoken)
      .then(resp => {
        this.setState({
          loading: false,
          user: Parser.parseUser(resp.data.user)
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.errorMessage
        });
      });
  }

  renderUser() {
    return (
      <View>
        <Text style={styles.userTitle}>User Information</Text>
        {Object.keys(this.state.user).map((element, index) => (
          <Text key={index}>
            {`${element.toUpperCase()}: ${this.state.user[element]}`}
          </Text>
        ))}
      </View>
    );
  }

  renderButton() {
    if (this.state.status === requestStatus.HAVENT_YET_LOG) {
      return (
        <Button title="Login" style={styles.button} onPress={this.login} />
      );
    }
    return (
      <View>
        <Button
          title="Get User Information"
          style={styles.button}
          onPress={this.getUserInfor}
        />
        <Button title="Logout" style={styles.button} onPress={this.logout} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.status === requestStatus.HAVENT_YET_LOG ? (
          <View>
            <InformationInput title="Email" onChangeText={this.onChangeEmail} />
            <InformationInput
              title="Password"
              secureTextEntry={true}
              onChangeText={this.onChangePassword}
            />
          </View>
        ) : null}
        {this.state.error && this.state.error.length > 0 ? (
          <Text style={styles.error}>{`Error: ${this.state.error}`}</Text>
        ) : null}
        {Object.keys(this.state.user).length > 0 ? this.renderUser() : null}
        {this.state.loading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator />
          </View>
        ) : (
          this.renderButton()
        )}
      </View>
    );
  }
}
