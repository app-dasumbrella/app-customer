/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, I18nManager } from "react-native";
import TimeAgo from "react-native-timeago";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache, ProductPrice, Rating } from "@components";
import css from "./style";

export default class CardLayout extends Component {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { post, title, type, imageURL, date, viewPost } = this.props;
    const wishIcon = {
      top: 17,
      right: 30,
    };
    const wishIconRTL = {
      top: 17,
      left: 17,
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelOne}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanelOne} />
        <Text style={css.nameOne}>{title}</Text>

        {typeof type !== "undefined" && (
          <Text style={[css.timeOne, { textAlign: "center" }]}>
            <TimeAgo time={date} />
          </Text>
        )}
        {typeof type === "undefined" && (
          <ProductPrice product={post} hideDisCount />
        )}
        {typeof type === "undefined" && (
          <WishListIconContainer
            product={post}
            style={I18nManager.isRTL ? wishIconRTL : wishIcon}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.averageRating} />}
      </TouchableOpacity>
    );
  }
}
