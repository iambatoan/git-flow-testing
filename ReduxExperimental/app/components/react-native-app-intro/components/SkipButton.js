import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../constants';

const windowsWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '80%',
    borderRadius: windowsWidth * 0.6 / 2,
    backgroundColor: Colors.white,
    marginTop: 20
  },
  text: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '300'
  }
});

const SkipButton = ({
  onSkipBtnClick,
  isSkipBtnShow,
  skipBtnLabel,
  skipFadeOpacity
}) => (
  <TouchableOpacity
    style={styles.btnContainer}
    onPress={isSkipBtnShow ? () => onSkipBtnClick() : null}
    activeOpacity={0.5}
  >
    <Text style={[styles.text]}>{skipBtnLabel}</Text>
  </TouchableOpacity>
);

export default SkipButton;
