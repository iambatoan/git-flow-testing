import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';

import { Colors } from '../../constants';

const styles = StyleSheet.create({
  headerContainer: {
    height: '25%'
  },
  backgroundHeader: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
    paddingHorizontal: 12
  },
  backText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold'
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  headerTitle: {
    color: Colors.red,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={[this.props.containerStyle, styles.backgroundHeader]}
          resizeMode="stretch"
          source={{
            uri:
              'https://www.cityu.edu.hk/cityu/images/img_outreach_enterprise.jpg'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.pop();
            }}
          >
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
