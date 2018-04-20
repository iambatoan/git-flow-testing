import React from 'react';
import { ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';

import { Button } from '../components';
import { Colors } from '../constants';
import API from '../api';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    backgroundColor: Colors.transparent
  }
});

const MARKERS = [
  { latitude: 10.778523, longitude: 106.667901 },
  { latitude: 10.776542, longitude: 106.66391 },
  { latitude: 10.781553, longitude: 106.664361 },
  { latitude: 10.77856, longitude: 106.659941 },
  { latitude: 10.774913, longitude: 106.664811 },
  { latitude: 10.778813, longitude: 106.670069 }
];

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onShowMarkers = this.onShowMarkers.bind(this);
    this.showRestaurants = this.showRestaurants.bind(this);
    this.onWatchPosition = this.onWatchPosition.bind(this);
    this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
    this.delta = {
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    };
    this.currentRegion = {
      latitude: 0,
      longitude: 0
    };
    this.state = {
      userPos: this.currentRegion,
      markers: [],
      region: this.currentRegion,
      showLoading: true
    };
  }

  componentDidMount() {
    this.onGetCurrentPosition();
    this.onWatchPosition();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userPos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        if (userPos !== this.state.userPos) {
          this.setState({ userPos, region: userPos, showLoading: false });
          this.onRegionChange(userPos);
        }
      },
      error => {
        this.setState({ showLoading: false });
        Alert.alert(error.message);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 }
    );
  }

  onWatchPosition() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      const userPos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      if (userPos !== this.state.userPos) {
        this.setState({ userPos, region: userPos, showLoading: false });
      }
    });
  }

  onShowMarkers() {
    this.setState({
      region: { ...this.state.region, ...MARKERS[0] },
      markers: MARKERS
    });
  }

  onRegionChange(region) {
    this.currentRegion = region;
  }

  showRestaurants() {
    API.getLocations(this.state.region, API.PlaceType.Restaurant)
      .then(resp => {
        const markers = resp.data.map(item => ({
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
          title: item.name,
          description: item.vicinity
        }));
        this.setState({ markers });
      })
      .catch(error => {
        if (error) {
          Alert.alert(error.errorMessage || error);
        }
      });
  }

  render() {
    if (this.state.showLoading) {
      return <ActivityIndicator />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          region={{ ...this.state.region, ...this.delta }}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={marker.title || `Title ${index + 1}`}
              description={marker.description || `Description ${index + 1}`}
            />
          ))}
        </MapView>
        <Button
          style={styles.button}
          title="Show markers"
          onPress={this.onShowMarkers}
        />
        <Button
          style={styles.button}
          title="Show current location"
          onPress={() => {
            this.setState({ region: this.state.userPos });
          }}
        />
        <Button
          style={styles.button}
          title="Show restaurant"
          onPress={this.showRestaurants}
        />
      </SafeAreaView>
    );
  }
}
