/** @format */

import React, { Component } from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Tools } from "@common";
import styles from "./styles";

export default class ProductDetailTitle extends Component {
  render() {
    const { product, selectedVariant, number_of_decimals, currency } = this.props;

    // selectedVariant
    //     ? selectedVariant.price
    //     :

    const productPrice = Tools.getPrice(selectedVariant && selectedVariant.sale_price, number_of_decimals, currency);
    //selectedVariant ? selectedVariant.regularPrice :
    const productRegularPrice = Tools.getPrice(selectedVariant && selectedVariant.regular_price, number_of_decimals, currency);
    const isOnSale = selectedVariant ? selectedVariant.onSale : false

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <View style={styles.productTitle}>
          <Text style={styles.productName}>{product && product.title}</Text>
          <Text style={styles.productTypeName}>{product && product.productType}</Text>
        </View>
        {/* <Animatable.Text animation="fadeInDown" style={styles.productPrice}>
          {productPrice}
        </Animatable.Text>
        {isOnSale && (
          <Animatable.Text
            animation="fadeInDown"
            style={styles.productPriceSale}
          >
            {productRegularPrice}
          </Animatable.Text>
        )} */}
      </View>
    );
  }
}
