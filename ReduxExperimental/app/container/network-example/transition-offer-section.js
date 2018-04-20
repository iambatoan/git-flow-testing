import React from 'react';
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import { StringConfig } from '../../config';
import { Colors } from '../../constants';
import { OfferAction } from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  error: {
    color: Colors.red,
    textAlign: 'center'
  },
  section: {
    padding: 15,
    justifyContent: 'center',
    backgroundColor: Colors.white
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

  componentDidMount() {
    this.props.actions.getOffers();
  }

  componentWillUnmount() {
    this.props.actions.resetOffer();
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

  _renderSectionHeader = ({ section: { title } }) => (
    <View>
      <View style={styles.section}>
        <Text>{title}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );

  render() {
    const { isLoading, sectionOffers, errorMessage } = this.props;
    if (errorMessage && errorMessage.length > 0) {
      return (
        <View style={styles.loadingView}>
          <Text style={styles.error}>{`Error: ${errorMessage}`}</Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sectionOffers}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
          renderSectionHeader={this._renderSectionHeader}
        />
      </SafeAreaView>
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
