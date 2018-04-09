import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default class AutoLayout extends React.Component {
  constructor(props) {
    super(props);
    this.indexOfItem = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datas !== this.props.datas) {
      this.indexOfItem = 0;
    }
  }

  renderView(item, index) {
    const { width = '100%', height = '100%' } = item;
    return (
      <View
        key={`item_${index}`}
        style={[this.props.containerStyle, { width, height }]}
      >
        {this.props.renderItem(index)}
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
        {items.map(view => this.renderView(view, this.indexOfItem++))}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.datas.map((item, index) =>
            this.renderContainerView(item, index)
          )}
        </View>
      </ScrollView>
    );
  }
}
