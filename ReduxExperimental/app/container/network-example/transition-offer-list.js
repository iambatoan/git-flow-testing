import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { ActionTypes } from '../../actions';

import { Colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 15
  },
  rowContent: {
    flex: 1
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.black
  },
  firtRowContent: {
    fontWeight: 'bold'
  },
  secondRowContent: {
    fontWeight: 'bold',
    marginTop: 5
  },
  content: {
    fontWeight: 'normal'
  }
});

const STATUS_COLOR = {
  open: 'green',
  close: 'red'
};

class TransitionOffers extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _keyExtractor = (item, index) => String(item.offer.id);

  _renderSeparator = () => <View style={styles.line} />;

  _renderItem({ item }) {
    const { offer } = item;
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => {
          this.props.navigateToDetail(offer.id);
        }}
      >
        <View style={styles.rowContent}>
          {offer.departure_location && offer.departure_location.length > 0 ? (
            <Text style={styles.firtRowContent}>
              {'Departure: '}
              <Text style={styles.content}>{offer.departure_location}</Text>
            </Text>
          ) : null}
          {offer.arrival_location && offer.arrival_location.length > 0 ? (
            <Text style={styles.secondRowContent}>
              {'Arrival: '}
              <Text style={styles.content}>{offer.arrival_location}</Text>
            </Text>
          ) : null}
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
    const { datas } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <FlatList
          data={datas}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  navigateToDetail: id => dispatch({ type: ActionTypes.FETCH_DETAIL_OFFER, id })
});

export default connect(mapStateToProps, mapDispatchToProps)(TransitionOffers);
