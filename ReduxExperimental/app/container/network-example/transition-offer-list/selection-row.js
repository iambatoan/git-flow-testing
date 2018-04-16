import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { Button } from '../../../components';
import { Colors } from '../../../constants';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  rowContent: {
    flex: 1
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  title: {
    fontWeight: 'bold'
  },
  italicTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  content: {
    fontWeight: 'normal',
    fontStyle: 'normal'
  },
  image: {
    width: 50,
    height: 50
  },
  largeTitle: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

const STATUS_COLOR = {
  open: 'green',
  close: 'red'
};

export default class SelectionRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onShowContent = this._handleShowContent.bind(this);
    this.state = {
      showContent: false
    };
  }

  _handleShowContent() {
    const shouldShowContent = !this.state.showContent;
    this.setState({ showContent: shouldShowContent });
  }

  _renderContentText = (title, content, titleStyle) => (
    <Text style={titleStyle || styles.italicTitle}>
      {title}
      <Text style={styles.content}>{content}</Text>
    </Text>
  );

  renderContent(item) {
    const { offer, user } = item;
    return (
      <View style={styles.contentContainer}>
        <Button title="Detail" onPress={this.props.navigateToDetail} />
        <Text style={styles.largeTitle}>Transaction Information</Text>
        {this._renderContentText('Departure: ', offer.departure_location)}
        {this._renderContentText('Arrival: ', offer.arrival_location)}
        {this._renderContentText('Description: ', offer.description)}
        {this._renderContentText(
          'Time: ',
          `${offer.arrival_time} - ${offer.departure_time}`
        )}
        <Text style={styles.largeTitle}>Driver Information</Text>
        {user.avatar_url ? (
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{
              uri: user.avatar_url
            }}
          />
        ) : null}
        {this._renderContentText('Name: ', user.full_name)}
        {this._renderContentText('Level: ', user.level)}
        {this._renderContentText('Rating: ', user.average_overall_rating)}
      </View>
    );
  }

  renderRow(offer) {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={this.onShowContent}
      >
        <View style={styles.rowContent}>
          {offer.departure_location && offer.departure_location.length > 0
            ? this._renderContentText(
                'Departure: ',
                offer.departure_location,
                styles.title
              )
            : null}
          {offer.arrival_location && offer.arrival_location.length > 0
            ? this._renderContentText(
                'Arrival: ',
                offer.arrival_location,
                styles.title
              )
            : null}
        </View>
        <View style={styles.status}>
          <Text style={{ color: STATUS_COLOR[offer.status] }}>
            {offer.status.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { item } = this.props;
    return (
      <View>
        {this.renderRow(item.offer)}
        {this.state.showContent ? this.renderContent(item) : null}
      </View>
    );
  }
}
