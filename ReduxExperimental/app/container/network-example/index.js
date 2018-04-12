import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { StringConfig } from '../../config';
import { UserAction } from '../../actions';

import API from '../../api';
import { Colors } from '../../constants';
import { Button, InformationInput } from '../../components';

import OfferListView from './transition-offer-list';
import OfferSectionList from './transition-offer-section';
import DetailOfferView from './transition-detail-offer';

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

const checkLogged = accesstoken =>
  accesstoken && accesstoken.length > 0
    ? requestStatus.LOGGED
    : requestStatus.HAVENT_YET_LOG;

// "email": "marthavangra@gmail.com",
// "password": "helloXtayPro"

class NetworkView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.email = '';
    this.password = '';

    this.onChangeEmail = this._handleChangeEmail.bind(this);
    this.onChangePassword = this._handleChangePassword.bind(this);
    this.login = this._handleLogin.bind(this);
    this.logout = this._handleLogout.bind(this);
    this.getUserInfor = this._getUserInfor.bind(this);

    this.state = {
      status: checkLogged(this.props.accessToken)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken !== this.props.accessToken) {
      this.setState({
        status: checkLogged(nextProps.accessToken)
      });
    }
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
    this.props.actions.login({ email: this.email, password: this.password });
  }

  _handleLogout() {
    this.email = '';
    this.password = '';
    this.props.actions.logout(this.props.accessToken);
  }

  _getUserInfor() {
    this.props.actions.getUserInfor(this.props.accessToken);
  }

  renderUser() {
    const { user } = this.props;
    return (
      <View>
        <Text style={styles.userTitle}>User Information</Text>
        {Object.keys(user).map((element, index) => (
          <Text key={index}>
            {`${element.toUpperCase()}: ${user[element]}`}
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
        <Button
          title="Offer List"
          style={styles.button}
          onPress={this.props.navigateOfferList}
        />
        <Button
          title="Offer List - Section"
          style={styles.button}
          onPress={this.props.navigateOfferSectionList}
        />
        <Button title="Logout" style={styles.button} onPress={this.logout} />
      </View>
    );
  }

  render() {
    const { errorMessage, user } = this.props;
    const { status } = this.state;
    return (
      <View style={styles.container}>
        {status === requestStatus.HAVENT_YET_LOG ? (
          <View>
            <InformationInput title="Email" onChangeText={this.onChangeEmail} />
            <InformationInput
              title="Password"
              secureTextEntry={true}
              onChangeText={this.onChangePassword}
            />
          </View>
        ) : null}
        {errorMessage && errorMessage.length > 0 ? (
          <Text style={styles.error}>{`Error: ${errorMessage}`}</Text>
        ) : null}
        {Object.keys(user).length > 0 ? this.renderUser() : null}
        {this.props.isLoading ? (
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

const mapStateToProps = state => ({ ...state.auth, ...state.user });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserAction, dispatch),
  navigateOfferList: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: StringConfig.OfferList.Name
      })
    ),
  navigateOfferSectionList: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: StringConfig.OfferSectionList.Name
      })
    )
});

export { OfferListView, DetailOfferView, OfferSectionList };
export default connect(mapStateToProps, mapDispatchToProps)(NetworkView);
