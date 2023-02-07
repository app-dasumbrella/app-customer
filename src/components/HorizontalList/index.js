/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, View, RefreshControl, Animated } from "react-native";
import { Languages, Images, Styles } from "@common";
import { ListItem, ListHeader, Spinkit } from "@components";
import { isFunction } from "lodash";


const DEFAULT_LIST = [
  { id: 1, name: Languages.loading, images: [Images.PlaceHolder] },
  { id: 2, name: Languages.loading, images: [Images.PlaceHolder] },
  { id: 3, name: Languages.loading, images: [Images.PlaceHolder] },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**
 * Horizontal List layout
 * TODO: refactor
 */
export default class HorizontalList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    list: DEFAULT_LIST
  };

  constructor(props) {
    super(props);

  }

  _loading = () => {
    return this.props.isFetching;
  };

  _hasNextPage = () => {
    return this.props.hasNextPage;
  };

  _handlePressSeeMore = () => {
    const { name, index, onPressSeeMore } = this.props;
    onPressSeeMore(index, name);
  };

  _handleReload = () => {
    if (isFunction(this.props.refetch)) {
      this.props.refetch();
    }
  };

  _handleLoadMore = () => {
    if (isFunction(this.props.loadMore)) {
      this.props.loadMore();
    }
  };

  _renderItem = ({ item, index }) => {
    const { layout, renderRow, layoutType } = this.props;

    if (!item) return <View />;

    return (
      <ListItem
        horizontal
        item={item}
        index={index}
        layout={layout}
        layoutType={layoutType}
        renderRow={renderRow}
      />
    );
  };

  _renderFooter = () => {
    if (this._loading() && this._hasNextPage()) {
      return <Spinkit style={{ marginBottom: 10 }} />;
    }
    return null;
  };

  render() {
    const { list, name, paging, isFetching, hideSeeAll } = this.props;

    return (
      <View style={styles.container}>
        <ListHeader
          title={name}
          onPress={this._handlePressSeeMore}
          hideSeeAll={hideSeeAll}
        />
        <AnimatedFlatList
          contentContainerStyle={styles.hlist}
          data={list}
          keyExtractor={(item) => `p__${item.id}`}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={paging}
          onEndReachedThreshold={1}
          horizontal
          onEndReached={this._handleLoadMore}
          ListFooterComponent={this._renderFooter}
        // refreshing={isFetching}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isFetching}
        //     onRefresh={this._handleReload}
        //   />
        // }
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  hlist: {
    flexDirection: "row",
    paddingLeft: Styles.spaceLayout,
  },
};
