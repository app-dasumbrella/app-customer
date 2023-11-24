/** @format */

import React, { Component } from "react";
import { View, Share } from "react-native";
import { connect } from "react-redux";
import { addWishlistItem, removeWishlistItem } from "@redux/actions";
import { getIsWishlistSelector } from "@redux/selectors";
import { Languages, Constants } from "@common";
import { Button } from "@components";
import styles from "./styles";
import { t } from "i18next";

const mapStateToProps = (state, props) => {
  return {
    isWishlist: getIsWishlistSelector(state, props.product),
    isFetching: state.carts.isFetching,
  };
};

const mapDispatchToProps = {
  addWishlistItem,
  removeWishlistItem,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ProductDetailBottomTabBar extends Component {
  _onShare = () => {
    const { product } = this.props;
    Share.share({
      message: product.long_desc.replace(/(<([^>]+)>)/gi, ""),
      url: product.onlineStoreUrl,
      title: product.title,
    });
  };

  _toggleToWishlist = () => {
    const { product, isWishlist } = this.props;
    if (isWishlist) {
      this.props.removeWishlistItem(product);
    } else {
      this.props.addWishlistItem(product);
    }
  };

  render() {
    const { product, isWishlist, primarycolors } = this.props;
    return (
      <View
        style={[
          styles.bottomView,
          Constants.RTL && { flexDirection: "row-reverse" },
        ]}>
        {/*     <View style={styles.buttonContainer}>
         <Button
            type="image"
            source={require("@images/icons/licon-share.png")}
            imageStyle={styles.imageButton}
            buttonStyle={styles.buttonStyle}
            onPress={this._onShare}
          /> 
          {/* <Button
            type="image"
            isAddWishList={isWishlist}
            source={require("@images/icons/icon-heart.png")}
            imageStyle={styles.imageButton}
            buttonStyle={styles.buttonStyle}
            onPress={this._toggleToWishlist}
          />  
          {/* <Button
            type="image"
            isAddToCart
            source={require("@images/icons/icon-cart.png")}
            imageStyle={styles.imageButton}
            disabled={!product.inStock}
            buttonStyle={styles.buttonStyle}
            onPress={() => this.props.addToCart(false)}
          /> 
        </View>*/}

        <Button
          text={!product.inStock ? t("ATC") : t("Outofstock")}
          style={[styles.btnBuy, product.inStock && styles.outOfStock, { backgroundColor: primarycolors }]}
          textStyle={styles.btnBuyText}
          disabled={product.inStock}
          isLoading={this.props.isFetching}
          //onPress={() => product.inStock && this.props.addToCart(true)}
          onPress={() => this.props.addToCart(true)}

        />
      </View>
    );
  }
}
