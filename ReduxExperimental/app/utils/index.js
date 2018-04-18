import { Platform, Dimensions } from 'react-native';
import Parser from './parser';

const { width, height } = Dimensions.get('window');

const isIphoneX = Platform.OS === 'ios' && (height === 812 || width === 812);

export { Parser, isIphoneX };
