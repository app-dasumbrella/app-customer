/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache, ProductPrice } from "@components";
import css from "./style";

export default class SimpleLayout extends Component {
  static propTypes = {
    post: PropTypes.object,
    type: PropTypes.string,
    // date: PropTypes.any,
    description: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.any,
    imageURL: PropTypes.string,
    viewPost: PropTypes.func,
    viewCategory: PropTypes.func,
  };

  render() {
    const {
      imageURL,
      post,
      type,
      title,
      description,
      // date,
      viewPost,
      category,
      viewCategory,
    } = this.props;

    const price = {
      alignItems: "flex-start",
      marginLeft: 5,
    };
    const priceRTL = {
      alignItems: "flex-end",
      marginRight: 5,
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          css.panelList,
          I18nManager.isRTL && { flexDirection: "row-reverse" },
        ]}
        onPress={viewPost}>
        <View style={css.simpleContent}>
          <Text style={css.simpleTitle}>{title}</Text>
          {description && <Text style={css.simpleDesc}>{description}</Text>}
          <View>
            {typeof type === "undefined" && (
              <ProductPrice
                product={post}
                style={I18nManager.isRTL ? priceRTL : price}
                hideDisCount
              />
            )}
            {category && (
              <TouchableOpacity onPress={viewCategory}>
                <Text style={css.category}>- {category}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ImageCache uri={imageURL} style={css.simpleImage} />
        {typeof type === "undefined" && (
          <WishListIconContainer product={post} style={{ top: 15 }} />
        )}
      </TouchableOpacity>
    );
  }
}
