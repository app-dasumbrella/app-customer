/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache, ProductPrice, Rating } from "@components";
import { Tools, Constants } from "@common";
import css from "./style";

export default class TwoColumn extends Component {
  static propTypes = {
    post: PropTypes.object,
    type: PropTypes.string,
    viewPost: PropTypes.func,
  };

  render() {
    const { post, type, viewPost } = this.props;
    const imageURL = Tools.getImage(post);
    const title = typeof post.title === "undefined" ? "" : post.title.rendered;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.smCardNews}
        onPress={viewPost}>
        <View style={css.cardView}>
          <ImageCache style={css.smImage} uri={imageURL} />
          <View style={css.smDescription}>
            <Text style={css.smTitle}>{Tools.getDescription(title)}</Text>
            {typeof type === "undefined" && (
              <ProductPrice product={post} hideDisCount />
            )}
          </View>
        </View>
        {typeof type === "undefined" && (
          <WishListIconContainer
            product={post}
            style={Constants.RTL ? { left: 10 } : { right: 25 }}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.averageRating} />}
      </TouchableOpacity>
    );
  }
}
