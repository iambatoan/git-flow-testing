import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
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
  }
});

class TransitionOffers extends React.Component {
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
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{
            uri: user.avatar_url
          }}
        />
        {this._renderContent('Name: ', user.full_name)}
        {this._renderContent('Level: ', user.level)}
        {this._renderContent('Rating: ', user.average_overall_rating)}
      </View>
    );
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {this._renderOffer(data.offer)}
        <View style={styles.line} />
        {this._renderUser(data.user)}
      </View>
    );
  }
}

export default TransitionOffers;
