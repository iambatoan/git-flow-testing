import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { LayoutConfig } from '../config';
import { AutoLayoutView } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  viewContainer: {
    padding: 5
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const randomColor = () =>
  'rgb(' +
  Math.floor(Math.random() * 256) +
  ',' +
  Math.floor(Math.random() * 256) +
  ',' +
  Math.floor(Math.random() * 256) +
  ')';

export default class AutoLayout extends React.Component {
  constructor(props) {
    super(props);
    this.data = LayoutConfig.LAYOUT_1;
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(index) {
    return (
      <View style={[styles.viewContent, { backgroundColor: randomColor() }]}>
        <Text>{index}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <AutoLayoutView
            datas={this.data}
            containerStyle={styles.viewContainer}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}
