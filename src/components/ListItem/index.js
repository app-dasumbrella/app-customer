/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { View } from "react-native";
import { isFunction } from "lodash";
import { LayoutItem, PostLayout } from "@components";
import { Constants, Layout } from "@common";

@withNavigation
export default class ListItem extends Component {
  static propTypes = {
    horizontal: PropTypes.bool.isRequired,
    layoutType: PropTypes.string.isRequired,
  };

  static defaultProps = {
    horizontal: false,
    layoutType: "product",
  };

  _handlePress = (item, index) => {
    if (isFunction(this.props.onPress)) {
      this.props.onPress(item, index, this.props.layoutType);
    }

    if (this.props.layoutType === "post") {
      this.props.navigation.navigate("News", { item });
    } else {
      this.props.navigation.navigate("Detail", { item });
    }
  };

  _getLayout = () => {
    const { layout, horizontal, index } = this.props;
    let layoutMode = layout;

    // update layout for advance mod
    if (!horizontal && !layoutMode) {
      if (layout === Constants.Layout.advance || !layout) {
        layoutMode = Layout[index % Layout.length];
      }
    }
    return layoutMode;
  };

  _renderPostLayout = () => {
    const { item, index } = this.props;
    if (!item) return <View key="p_" />;

    const onPress = () => this._handlePress(item, index);
    return (
      <PostLayout
        index={index}
        post={item}
        onPress={onPress}
        layout={this._getLayout()}
      />
    );
  };

  _renderProductLayout = () => {
    const { item, index, horizontal } = this.props;
    if (!item) return <View key="p_" />;

    const onPress = () => this._handlePress(item, index);
    return (
      <LayoutItem
        index={index}
        product={item}
        onPress={onPress}
        layout={this._getLayout()}
        horizontal={horizontal}
      />
    );
  };

  // two type layout "post" or "product"
  _renderItem = () => {
    const { layoutType } = this.props;

    if (layoutType === "post") return this._renderPostLayout();

    return this._renderProductLayout();
  };

  render() {
    const { renderRow } = this.props;

    // if (isFunction(renderRow)) return renderRow();

    // return this._renderItem();
  }
}
