/** @format */

import React, { Component } from "react";
import { TouchableOpacity, View, Text, I18nManager } from "react-native";
import { ImageCache } from "@components";
import { Languages, Styles, Constants } from "@common";
import LinearGradient from 'react-native-linear-gradient';

export default class MiniBanner extends Component {
  render() {
    const { onPress, title, product, imageURI, size, index } = this.props;

    return (
      <View style={Styles.Common.shadowCard}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.container,
            {
              width: size.width,
              height: size.height,
            },
            index !== 0 && { marginLeft: Styles.spaceLayout },
          ]}
          onPress={onPress}>
          <ImageCache uri={imageURI} style={styles.image} />
          {product && [
            <LinearGradient
              key="0"
              colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
              style={[styles.gradient, { width: size.width }]}>
              <Text style={styles.intro} numberOfLines={1}>
                {Languages.NewArrival.toUpperCase()}
              </Text>
              <Text style={styles.text} numberOfLines={1}>{title}</Text>
            </LinearGradient>,
            // <WishListIconContainer key="1" product={product} />,
          ]}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    marginBottom: 20,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  gradient: {
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
    height: 100,
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
  },
  intro: {
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
    letterSpacing: 0.64,
  },
  text: {
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 28,
    fontFamily: Constants.fontFamilyBold,
  },
};
