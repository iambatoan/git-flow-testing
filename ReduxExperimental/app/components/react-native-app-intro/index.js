import assign from 'assign-deep';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Platform
} from 'react-native';

import Swiper from './react-native-swiper';
import SkipButton from './components/SkipButton';
import RenderDots from './components/Dots';
import Slide from './components/Slide';

import { isIphoneX } from '../../utils';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const defaulStyles = {
  container: {
    flex: 1
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  paginationContainer: {
    flexDirection: 'row'
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default class AppIntro extends Component {
  constructor(props) {
    super(props);

    this.renderPagination = this.renderPagination.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this._onBottomLayout = this._onBottomLayout.bind(this);
    this._onHeaderLayout = this._onHeaderLayout.bind(this);

    this.styles = StyleSheet.create(
      assign({}, defaulStyles, props.customStyles)
    );

    this.state = {
      skipFadeOpacity: new Animated.Value(1),
      nextOpacity: new Animated.Value(1),
      parallax: new Animated.Value(0),
      bottomHeight: 0,
      headerHeight: 0
    };
  }

  componentWillUnmount() {
    StatusBar.setBackgroundColor(null);
  }

  onNextBtnClick(context) {
    if (context.state.isScrolling || context.state.total < 2) return;
    const state = context.state;
    const diff = (context.props.loop ? 1 : 0) + 1 + context.state.index;
    let x = 0;
    if (state.dir === 'x') x = diff * state.width;
    if (Platform.OS === 'ios') {
      context.scrollView.scrollTo({ y: 0, x });
    } else {
      context.scrollView.setPage(diff);
      context.onScrollEnd({
        nativeEvent: {
          position: diff
        }
      });
    }
    this.props.onNextBtnClick(context.state.index);
  }

  setSkipBtnOpacity(value) {
    Animated.timing(this.state.skipFadeOpacity, { toValue: value }).start();
  }

  setNextOpacity(value) {
    Animated.timing(this.state.nextOpacity, { toValue: value }).start();
  }

  getTransform(index, offset, level) {
    const isFirstPage = index === 0;
    const statRange = isFirstPage ? 0 : windowsWidth * (index - 1);
    const endRange = isFirstPage ? windowsWidth : windowsWidth * index;
    const startOpacity = isFirstPage ? 1 : 0;
    const endOpacity = isFirstPage ? 1 : 1;
    const leftPosition = isFirstPage ? 0 : windowsWidth / 3;
    const rightPosition = isFirstPage ? -windowsWidth / 3 : 0;
    const transform = [
      {
        transform: [
          {
            translateX: this.state.parallax.interpolate({
              inputRange: [statRange, endRange],
              outputRange: [
                isFirstPage ? leftPosition : leftPosition - offset * level,
                isFirstPage ? rightPosition + offset * level : rightPosition
              ]
            })
          }
        ]
      },
      {
        opacity: this.state.parallax.interpolate({
          inputRange: [statRange, endRange],
          outputRange: [startOpacity, endOpacity]
        })
      }
    ];
    return {
      transform
    };
  }

  shadeStatusBarColor = (color, percent) => {
    const first = parseInt(color.slice(1), 16);
    const black = first & 0x0000ff;
    const green = (first >> 8) & 0x00ff;
    const percentage = percent < 0 ? percent * -1 : percent;
    const red = first >> 16;
    const theme = percent < 0 ? 0 : 255;
    const finalColor = (
      0x1000000 +
      (Math.round((theme - red) * percentage) + red) * 0x10000 +
      (Math.round((theme - green) * percentage) + green) * 0x100 +
      (Math.round((theme - black) * percentage) + black)
    )
      .toString(16)
      .slice(1);

    return `#${finalColor}`;
  };

  _onBottomLayout(event) {
    const { height } = event.nativeEvent.layout;
    if (height !== this.state.bottomHeight) {
      this.setState({ bottomHeight: height });
    }
  }

  _onHeaderLayout(event) {
    const { height } = event.nativeEvent.layout;
    if (height !== this.state.headerHeight) {
      this.setState({ headerHeight: height });
    }
  }

  renderPagination(index, total, context) {
    return (
      <View onLayout={this._onBottomLayout} style={this.styles.bottomContainer}>
        <View style={this.styles.paginationContainer}>
          {this.props.showDots &&
            RenderDots(index, total, {
              ...this.props
            })}
        </View>
        {this.props.showSkipButton ? (
          <SkipButton
            {...this.props}
            {...this.state}
            isSkipBtnShow={true}
            onSkipBtnClick={() => {
              this.props.onSkipBtnClick(index);
            }}
          />
        ) : (
          <View style={this.styles.btnContainer} />
        )}
      </View>
    );
  }

  renderHeader() {
    return this.props.renderHeader ? (
      <View onLayout={this._onHeaderLayout}>{this.props.renderHeader()}</View>
    ) : null;
  }

  renderItem(index, item) {
    const { bottomHeight, headerHeight } = this.state;
    const { image, level, backgroundColor } = item;
    const bottomSpacer =
      (this.props.bottomButton
        ? (this.props.showSkipButton ? 44 : 0) + 44
        : 0) +
      (isIphoneX ? 34 : 0) +
      64;
    const topSpacer =
      headerHeight +
      (isIphoneX ? 44 : 0) +
      (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight);

    const AnimatedStyle1 = this.getTransform(index, 0, level);
    const AnimatedStyle2 = this.getTransform(index, 15, level);
    const AnimatedStyle3 = this.getTransform(index, 10, level);
    const imgSource = typeof image === 'string' ? { uri: image } : image;

    const props = {
      ...item,
      image: imgSource,
      bottomSpacer,
      topSpacer,
      width: windowsWidth,
      height: windowsHeight - bottomHeight,
      AnimatedStyle1,
      AnimatedStyle2,
      AnimatedStyle3
    };

    const viewStyle = [this.styles.container, { backgroundColor }];

    return this.props.renderItem ? (
      <View key={index} style={viewStyle}>
        {this.props.renderItem(props)}
      </View>
    ) : (
      <View key={index} style={viewStyle}>
        <Slide {...props} />
      </View>
    );
  }

  render() {
    const { pageArray } = this.props;
    let pages = [];
    pages = pageArray.map((page, i) => this.renderItem(i, page));

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        this.shadeStatusBarColor(this.props.pageArray[0].backgroundColor, -0.3),
        false
      );
    }

    return (
      <Swiper
        loop={false}
        index={this.props.defaultIndex}
        renderPagination={this.renderPagination}
        renderHeader={this.renderHeader}
        onMomentumScrollEnd={(e, state) => {
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(
              this.shadeStatusBarColor(
                this.props.pageArray[state.index].backgroundColor,
                -0.3
              ),
              false
            );
          }
          this.props.onSlideChange(state.index, state.total);
        }}
        onScroll={Animated.event([{ x: this.state.parallax }])}
      >
        {pages}
      </Swiper>
    );
  }
}

AppIntro.propTypes = {
  dotColor: PropTypes.string,
  activeDotColor: PropTypes.string,
  onSlideChange: PropTypes.func,
  onSkipBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
  pageArray: PropTypes.arrayOf(PropTypes.shape({})),
  skipBtnLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  nextBtnLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  customStyles: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.shape({}))
  ]),
  defaultIndex: PropTypes.number,
  showSkipButton: PropTypes.bool,
  showDots: PropTypes.bool
};

AppIntro.defaultProps = {
  dotColor: 'rgba(255,255,255,.3)',
  activeDotColor: '#fff',
  pageArray: [],
  onSlideChange: () => {},
  onSkipBtnClick: () => {},
  onNextBtnClick: () => {},
  skipBtnLabel: 'Skip',
  nextBtnLabel: '›',
  defaultIndex: 0,
  showSkipButton: true,
  showDots: true,
  customStyles: {}
};
