/** @format */

import React, { Component } from "react";
import { TouchableOpacity, View, Text, I18nManager } from "react-native";
import PropTypes from "prop-types";
import LinearGradient from 'react-native-linear-gradient';
import WishListIconContainer from '../../containers/WishListIconContainer'
import { ImageCache } from "@components";
import { Constants, Styles, Tools, Languages } from "@common";

/**
 * TODO: refactore
 */
export default class VerticalItemBanner extends Component {
  static propTypes = {
    layout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    layout: Constants.Layout.threeColumn,
  };

  _getProps = () => {
    const { onPress, product, index, imageURI } = this.props;
    const size = this._getSizeItem();
    let props = {};
    //console.log(imageURI)
    if (!product && imageURI) {
      props = {
        onPress,
        imageURI,
        size,
        index,
      };
    } else {
      const imageURI = Tools.getProductImage(
        product.defaultImage,
        Styles.window.width
      );
      const productPrice = `${Tools.getPrice(product.price)} `;
      const productPriceSale = product && product.onSale
        ? `${Tools.getPrice(product.regularPrice)} `
        : null;
      props = {
        onPress,
        imageURI,
        title: product.title,
        product,
        productPrice,
        productPriceSale,
        index,
        size,
      };
    }

    return props;
  };

  _getSizeItem = () => {
    return Styles.LayoutCard[`layout${this.props.layout}`];
  };

  render() {
    const { onPress, title, product, imageURI, size } = this._getProps();

    return (
      <View style={Styles.Common.shadowCard}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.container,
            {
              width: Styles.window.width,
              height: size.height,
            },
          ]}
          onPress={onPress}>
          <ImageCache uri={imageURI} style={styles.image} />
          {product && [
            <LinearGradient
              key="0"
              colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
              style={[styles.gradient, { width: Styles.window.width }]}>
              <Text style={styles.intro} numberOfLines={1}>
                {Languages.NewArrival.toUpperCase()}
              </Text>
              <Text style={styles.text} numberOfLines={1}>
                {title}
              </Text>
            </LinearGradient>,
            <WishListIconContainer key="1" product={product} />,
          ]}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    marginBottom: 20,
    // borderRadius: 4,
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
