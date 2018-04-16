import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { StringConfig } from '../../config';
import { Colors } from '../../constants';
import { OfferAction } from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  error: {
    color: Colors.red,
    textAlign: 'center'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  italicText: {
    fontStyle: 'italic'
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
    this._renderFooter = this._renderFooter.bind(this);
    this.loadMore = this._handleLoadMore.bind(this);
    this.getData = this._handleGetData.bind(this);
    this.onEndReachedCalledDuringMomentum = false;
  }

  componentDidMount() {
    this._handleGetData();
  }

  componentWillUnmount() {
    this.props.actions.resetOffer();
  }

  _handleGetData() {
    this.props.actions.getOffers();
  }

  _handleLoadMore() {
    if (
      !this.onEndReachedCalledDuringMomentum &&
      this.props.offset &&
      !this.props.isLoading
    ) {
      this.props.actions.loadMore(this.props.offset);
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  _keyExtractor = (item, index) => String(item.offer.id);

  _renderSeparator = () => <View style={styles.line} />;

  _renderFooter() {
    if (
      !this.props.isLoading ||
      !this.props.offers ||
      this.props.offers.length === 0
    ) {
      return <View />;
    }
    return (
      <View style={styles.emptyView}>
        <ActivityIndicator />
      </View>
    );
  }

  _renderItem1 = offer => (
    <View style={styles.rowContainer}>
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
    </View>
  );

  _renderItem2 = item => {
    const { user, offer } = item;
    return (
      <View style={styles.rowContainer}>
        {user.avatar_url && user.avatar_url.length > 0 ? (
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{
              uri: user.avatar_url
            }}
          />
        ) : null}
        <View style={styles.rowContent}>
          {user.full_name && user.full_name.length > 0 ? (
            <Text style={[styles.secondRowContent, styles.italicText]}>
              {'Driver: '}
              <Text style={styles.content}>{user.full_name}</Text>
            </Text>
          ) : null}
          {offer.description && offer.description.length > 0 ? (
            <Text
              style={[styles.secondRowContent, styles.italicText]}
              numberOfLines={2}
            >
              {'Trip Description: '}
              <Text style={styles.content}>{offer.description}</Text>
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  _renderItem({ item, index }) {
    const { offer } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigateToDetail(offer.id);
        }}
      >
        {index % 2 === 0 ? this._renderItem1(offer) : this._renderItem2(item)}
      </TouchableOpacity>
    );
  }

  render() {
    const { isLoading, offers, errorMessage } = this.props;
    if (errorMessage && errorMessage.length > 0) {
      return (
        <View style={[styles.container, styles.emptyView]}>
          <Text style={styles.error}>{`Error: ${errorMessage}`}</Text>
        </View>
      );
    }
    if (isLoading && (!offers || offers.length === 0)) {
      return (
        <View style={[styles.container, styles.emptyView]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={offers}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          refreshing={isLoading}
          onRefresh={this.getData}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }} // https://github.com/facebook/react-native/issues/14015
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state.offer });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(OfferAction, dispatch),
  navigateToDetail: id =>
    dispatch(
      NavigationActions.navigate({
        routeName: StringConfig.DetailOffer.Name,
        params: { id }
      })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(TransitionOffers);
