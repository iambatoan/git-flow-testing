import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

import { Colors } from '../../../constants';

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    color: Colors.white,
    fontWeight: '300',
    paddingHorizontal: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16
  },
  image: {
    width: 200,
    height: 200
  }
});

export default class Slide extends React.PureComponent {
  render() {
    const {
      topSpacer,
      bottomSpacer,
      width,
      height,
      AnimatedStyle1,
      AnimatedStyle2,
      AnimatedStyle3,
      fontColor = Colors.white,
      image,
      imageStyle
    } = this.props;
    const style = {
      paddingTop: 20 + topSpacer,
      paddingBottom: bottomSpacer,
      width,
      height
    };
    return (
      <View style={[styles.mainContent, style]}>
        <View>
          <Animated.View style={AnimatedStyle1.transform}>
            <Text style={[styles.title, { color: fontColor }]}>
              {this.props.title}
            </Text>
          </Animated.View>
          <Animated.View style={AnimatedStyle2.transform}>
            <Text style={[styles.text, { color: fontColor }]}>
              {this.props.description}
            </Text>
          </Animated.View>
        </View>
        <Animated.View style={[...AnimatedStyle3.transform]}>
          <Image source={image} style={[styles.image, imageStyle]} />
        </Animated.View>
      </View>
    );
  }
}
