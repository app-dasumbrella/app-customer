/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache, ProductPrice, Rating } from "@components";
import { Constants } from "@common";
import css from "./style";

export default class ColumnLayout extends Component {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { imageURL, post, type, title, date, viewPost } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelTwo}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanelTwo} />

        <Text style={css.nameTwo}>{title}</Text>
        {typeof type !== "undefined" && (
          <Text style={[css.timeTwo, { alignSelf: "center" }]}>
            <TimeAgo time={date} />
          </Text>
        )}
        {typeof type === "undefined" && (
          <ProductPrice product={post} hideDisCount />
        )}
        {typeof type === "undefined" && (
          <WishListIconContainer
            product={post}
            style={Constants.RTL ? { left: 20 } : { right: 25 }}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.averageRating} />}
      </TouchableOpacity>
    );
  }
}
