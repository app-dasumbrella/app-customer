/** @format */

import React, { Component } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { connect } from "react-redux";
import { Constants, Color } from "../common";
import {
  fetchProductLayoutNextPage,
  fetchArticlessLayoutNextPage,
} from "../redux/operations";
import {
  getlayoutIndexSelector,
  getHasNextPageIndexSelector,
  getCursorIndexSelector,
  getIsFetchingIndexSelector,
  getCategoryIdIndexSelector,
} from "../redux/selectors";
import { VerticalList } from "../components";

const mapStateToProps = (state, props) => {
  const index = props.navigation.getParam("index");
  return {
    list: getlayoutIndexSelector(state, index),
    hasNextPage: getHasNextPageIndexSelector(state, index),
    cursor: getCursorIndexSelector(state, index),
    isFetching: getIsFetchingIndexSelector(state, index),
    categoryId: getCategoryIdIndexSelector(state, index),
  };
};

const mapDispatchToProps = {
  fetchProductLayoutNextPage,
  fetchArticlessLayoutNextPage,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ListAllContainer extends Component {
  scrollAnimation = new Animated.Value(0);

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 90],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  _loadMore = () => {
    const { navigation, hasNextPage, cursor, categoryId } = this.props;
    const index = navigation.getParam("index");
    if (hasNextPage && cursor) {
      if (categoryId) {
        this.props.fetchProductLayoutNextPage({ cursor, index, categoryId });
      } else {
        this.props.fetchArticlessLayoutNextPage({ cursor, index });
      }
    }
  };

  _renderHeader = () => {
    const name = this.props.navigation.getParam("name");

    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
    );
  };

  render() {
    const { list, isFetching, hasNextPage, categoryId } = this.props;

    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <View style={styles.container}>
        <VerticalList
          contentContainerStyle={{ marginHorizontal: 15 }}
          list={list}
          isFetching={isFetching}
          renderHeader={this._renderHeader}
          onLoadMore={this._loadMore}
          onRefetch={this._fetchAll}
          hasNextPage={hasNextPage}
          layout={Constants.Layout.threeColumn}
          layoutType={!categoryId && "post"}
          {...{ onScroll }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: Color.textDefault,
    fontSize: 30,
    fontFamily: Constants.fontFamilyBold,
  },
});
