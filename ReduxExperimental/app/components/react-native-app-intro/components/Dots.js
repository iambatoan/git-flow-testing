import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../../constants';

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: Colors.white,
    width: 13,
    height: 13,
    borderRadius: 7,
    margin: 7,
    opacity: 0.3
  },
  activeDotStyle: {
    backgroundColor: Colors.white,
    opacity: 1
  }
});

const Dot = ({ dotColor, activeDotColor, active }) => {
  if (active) {
    return (
      <View
        style={[
          styles.dotStyle,
          styles.activeDotStyle,
          {
            backgroundColor: activeDotColor
          }
        ]}
      />
    );
  }
  return (
    <View
      style={[
        styles.dotStyle,
        {
          backgroundColor: dotColor
        }
      ]}
    />
  );
};

const RenderDots = (index, total, props) => {
  const dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      React.createElement(Dot, {
        ...props,
        key: i,
        active: i === index
      })
    );
  }
  return dots;
};

export default RenderDots;
