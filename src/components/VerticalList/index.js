/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  View,
  RefreshControl,
  Animated,
  // Platform,
} from "react-native";
import { Languages, Images, Constants } from "@common";
import { ListItem, AnimatedHeader, Spinkit } from "@components";
import { isFunction } from "lodash";
import styles from "./styles";

const DEFAULT_LIST = [
  { id: 1, name: Languages.loading, images: [Images.PlaceHolder] },
  { id: 2, name: Languages.loading, images: [Images.PlaceHolder] },
  { id: 3, name: Languages.loading, images: [Images.PlaceHolder] },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**
 * Vertical list layout
 */
export default class VerticalList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    numColumns: PropTypes.number.isRequired,
    showHeader: PropTypes.bool.isRequired,
    onRefetch: PropTypes.func,
    isAnimatedHeader: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    list: DEFAULT_LIST,
    isFetching: false,
    numColumns: 3,
    showHeader: false,
    isAnimatedHeader: false,
  };

  state = { scrollY: new Animated.Value(0) };

  _loading = () => {
    return this.props.isFetching;
  };

  _hasNextPage = () => {
    return this.props.hasNextPage;
  };

  _handlePress = (item, index) => {
    this.props.onPressItem(item, index);
  };

  _handlePressSeeMore = () => {
    const { name, index, onPressSeeMore } = this.props;
    onPressSeeMore(index, name);
  };

  _handleReload = () => {
    if (isFunction(this.props.onRefetch)) {
      this.props.onRefetch();
    }
  };

  _handleLoadMore = () => {
    if (isFunction(this.props.onLoadMore)) {
      this.props.onLoadMore();
    }
  };

  _renderItem = ({ item, index }) => {
    const { layout, renderRow, layoutType, list } = this.props;
    if (renderRow) return renderRow(item, index);

    //  if (!item) return <View />;

    // render banner with first item
    // if (list.length > 3) {
    //   if (index === 0)
    //   return (
    //     <ListItem
    //       item={item}
    //       index={index}
    //       layout={Constants.Layout.miniBanner}
    //       layoutType={layoutType}
    //     />
    //   );
    // }


    return (
      <ListItem
        item={item}
        index={index}
        layout={layout}
        layoutType={layoutType}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.onLoadMore && this._hasNextPage()) {
      return <Spinkit style={{ marginBottom: 10 }} />;
    }
    return null;
  };

  _renderHeader = () => {
    if (isFunction(this.props.renderHeader)) {
      return this.props.renderHeader();
    }
    if (this.props.showHeader)
      return (
        <AnimatedHeader
          scrollY={this.state.scrollY}
          label={this.props.name}
          onPress={this._handlePressSeeMore}
          hideIcon
        />
      );

    return null;
  };

  render() {
    const {
      list,
      paging,
      isFetching,
      numColumns,
      // renderScrollComponent,
      onRefetch,
      contentContainerStyle,
      isAnimatedHeader,
      categoryLayoutMode
    } = this.props;

    return (
      <View style={styles.container}>
        {/* {isAnimatedHeader && this._renderHeader()} */}

        <AnimatedFlatList
          contentContainerStyle={[styles.vlist, contentContainerStyle]}
          data={list}
          keyExtractor={(item, index) =>
            `p__${index}`
          }
          showsVerticalScrollIndicator={false}
          key={numColumns}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={paging}
          onEndReachedThreshold={1}
          numColumns={numColumns}
          onEndReached={this._handleLoadMore}
          //   ListHeaderComponent={this._renderHeader}
          //  ListFooterComponent={this._renderFooter}
          refreshing={isFetching}
          refreshControl={
            onRefetch ? (
              <RefreshControl
                refreshing={isFetching}
                onRefresh={this._handleReload}
              />
            ) : null
          }
          onScroll={this.props.onScroll}
        />
      </View>
    );
  }
}
