import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { data, data2 } from './test-data';

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
    this.data = data;
  }

  renderView(item, index) {
    const { width = '100%', height = '100%' } = item;
    return (
      <View
        key={`item_${index}`}
        style={[styles.viewContainer, { width, height }]}
      >
        <View style={[styles.viewContent, { backgroundColor: randomColor() }]}>
          <Text>{index}</Text>
        </View>
      </View>
    );
  }

  renderContainerView(item, index) {
    const { direction, width = '100%', height = '100%', items } = item;
    return (
      <View
        key={`container_${index}`}
        style={{ flexDirection: direction, width, height }}
      >
        {items.map((view, idx) =>
          this.renderView(view, `${index + 1}-${idx + 1}`)
        )}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.data.map((item, index) =>
            this.renderContainerView(item, index)
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
