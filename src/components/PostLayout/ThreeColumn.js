/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  I18nManager,
  View,
  Platform,
} from "react-native";
import TimeAgo from "@custom/react-native-timeago";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache, ProductPrice, Rating } from "@components";
import { Color, Styles, Constants } from "@common";

export default class ThreeColumn extends Component {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { viewPost, title, post, type, imageURL, date, layout } = this.props;
    const size = Styles.LayoutCard[`layout${layout}`];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.panelThree, { width: size.width }]}
        onPress={viewPost}>
        <ImageCache
          uri={imageURL}
          style={[
            styles.imagePanelThree,
            { width: size.width, height: size.height },
          ]}
        />

        <Text style={[styles.nameThree, { width: size.width }]}>{title}</Text>
        {typeof type !== "undefined" && (
          <View>
            <Text style={styles.timeThree}>
              <TimeAgo time={date} />
            </Text>
            <ProductPrice product={post} hideDisCount />
            <WishListIconContainer
              product={post}
              style={I18nManager.isRTL ? { left: 10 } : { right: 20 }}
            />
            <Rating rating={post.averageRating} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = {
  panelThree: {
    alignItems: "flex-start",
    marginBottom: 12,
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  imagePanelThree: {
    overflow: "hidden",
    marginBottom: 4,
    borderRadius: 3,
  },
  nameThree: {
    fontSize: 13,
    marginRight: 8,
    marginTop: 8,
    fontFamily:
      Platform.OS !== "android"
        ? Constants.fontFamily
        : Constants.fontHeaderAndroid,
    textAlign: "center",
    color: Color.Text,
  },
};
