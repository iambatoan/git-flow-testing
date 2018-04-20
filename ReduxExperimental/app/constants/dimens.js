import { Platform, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const IPHONE_X_HEIGHT = 812;

const isIphoneX =
  Platform.OS === 'ios' &&
  (width === IPHONE_X_HEIGHT || height === IPHONE_X_HEIGHT);

export default {
  STATUS_BAR_HEIGHT: Platform.select({
    ios: isIphoneX ? 44 : 20,
    android: StatusBar.currentHeight
  }),
  IPHONE_X_HEIGHT,
  WIN_WIDTH: width,
  WIN_HEIGHT: height,
  BOTTOM_PADDING: isIphoneX ? 34 : 0,
  isIphoneX
};
