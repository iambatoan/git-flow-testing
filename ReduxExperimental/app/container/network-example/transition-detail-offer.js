import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView } from 'react-navigation';

import { OfferAction } from '../../actions';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  },
  content: {
    fontWeight: 'normal'
  },
  image: {
    width: 100,
    height: 100
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.black,
    marginVertical: 5
  },
  error: {
    color: Colors.red,
    textAlign: 'center'
  }
});

class TransitionOffers extends React.Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.actions.getDetailOffer(id);
  }

  componentWillUnmount() {
    this.props.actions.resetDetailOffer();
  }

  _renderContent = (title, content) => (
    <Text style={styles.title}>
      {title}
      <Text style={styles.content}>{content}</Text>
    </Text>
  );

  _renderOffer(offer) {
    return (
      <View>
        {this._renderContent('Departure: ', offer.departure_location)}
        {this._renderContent('Arrival: ', offer.arrival_location)}
        {this._renderContent('Description: ', offer.description)}
        {this._renderContent(
          'Time: ',
          `${offer.arrival_time} - ${offer.departure_time}`
        )}
      </View>
    );
  }

  _renderUser(user) {
    return (
      <View>
        {user.avatar_url ? (
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{
              uri: user.avatar_url
            }}
          />
        ) : null}
        {this._renderContent('Name: ', user.full_name)}
        {this._renderContent('Level: ', user.level)}
        {this._renderContent('Rating: ', user.average_overall_rating)}
      </View>
    );
  }

  render() {
    const { isLoading, data, errorMessage } = this.props;
    if (errorMessage && errorMessage.length > 0) {
      return (
        <View style={styles.loadingView}>
          <Text style={styles.error}>{`Error: ${errorMessage}`}</Text>
        </View>
      );
    }
    if (isLoading || !data || Object.keys(data).length === 0) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        {this._renderOffer(data.offer)}
        <View style={styles.line} />
        {this._renderUser(data.user)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ ...state.detailoffer });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(OfferAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TransitionOffers);
